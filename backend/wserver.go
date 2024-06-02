package main

import (
	"fmt"
	"strconv"
	"strings"

	// "websocket"

	"golang.org/x/net/websocket"
)

type wsserver struct {
	chan_ls [101]chan int
}

func NewWServer() wsserver {
	var chans [101]chan int
	for i := range chans {
		chans[i] = make(chan int)
	}
	return wsserver{
		chan_ls: chans,
	}
}

func checkifwon(board [9]int, cue int) bool {
	//board logic
	lines := [][]int{
		{0, 1, 2},
		{3, 4, 5},
		{6, 7, 8},
		{0, 3, 6},
		{1, 4, 7},
		{2, 5, 8},
		{0, 4, 8},
		{2, 4, 6},
	}

	for i := 0; i < len(lines); i++ {
		a := lines[i][0]
		b := lines[i][1]
		c := lines[i][2]
		if board[a] == board[b] && board[b] == board[c] && board[c] == cue {
			return true
		}
	}

	return false
}
func checkifdraw(board [9]int) bool {

	count := 0
	for i := 0; i < 9; i++ {
		if board[i] == -1 {
			count++
		}
	}
	if count == 0 {
		return true
	}
	return false
}

func handlsocket(ws *websocket.Conn, user string, ans chan int, chan_table_index int) {
	fmt.Println("is it reconnecting")
	var a int
	tries := 0
	board := [9]int{-1, -1, -1, -1, -1, -1, -1, -1, -1} //0 for p1 1 for p2
	select {
	case <-ans:
		fmt.Print("welcome p2")
		ws.Write([]byte("setup2"))
		// if a != 69 {
		// 	panic(1)
		// }
		for {
			//waiting for p1
			a = <-ans
			if a < 0 {
				board[-a] = 0
				if checkifwon(board, 0) {
					ws.Write([]byte(fmt.Sprint(-a)))
					ws.Write([]byte("lost_" + chan_table[chan_table_index].p1))
					ws.Close()
					return
				} else {
					ws.Write([]byte(fmt.Sprint(-a)))
					ws.Write([]byte("draw_" + chan_table[chan_table_index].p1))
					ws.Close()
					return
				}
			} else {
				ws.Write([]byte(fmt.Sprint(a)))
			}
			board[a] = 0
			//waiting for self
			temp := make([]byte, 100)
			n, _ := ws.Read(temp)
			a, _ := strconv.Atoi((string(temp[:n])))
			fmt.Println("P2 said :", a)
			board[a] = 1
			if checkifwon(board, 1) {
				a = -a
				//wining statemen
				ws.Write([]byte("won_" + chan_table[chan_table_index].p1))
				ws.Close()
				tries += 1
				ans <- a
				return
			}
			if checkifdraw(board) {
				a = -a
				//wining statemen
				ws.Write([]byte("draw_" + chan_table[chan_table_index].p1))
				ws.Close()
				tries += 1
				ans <- a
				return
			}
			tries += 1
			ans <- a
			//need to add veification
		}

	default:
		fmt.Print("welcome p1")
		ws.Write([]byte("setup1"))
		ans <- 63
		for {
			//waiting for self
			temp := make([]byte, 100)
			n, err := ws.Read(temp)
			if err != nil {
				fmt.Println("closed because of ", err)
				ws.Close()
				return
			}
			a, _ := strconv.Atoi((string(temp[:n])))
			fmt.Println("P1 said :", a)
			board[a] = 0
			if checkifwon(board, 0) {
				a = -a
				//wining statemen
				ws.Write([]byte("won_" + chan_table[chan_table_index].p2))
				ws.Close()
				tries += 1
				ans <- a
				return
			}
			if checkifdraw(board) {
				a = -a
				//wining statemen
				ws.Write([]byte("draw_" + chan_table[chan_table_index].p2))
				ws.Close()
				tries += 1
				ans <- a
				return
			}
			tries += 1
			ans <- a
			//need to add veification
			//waiting for p2
			a = <-ans
			if a < 0 {
				board[-a] = 1
				if checkifwon(board, 1) {
					ws.Write([]byte(fmt.Sprint(-a)))
					ws.Write([]byte("lost_" + chan_table[chan_table_index].p2))
					ws.Close()
					return
				} else {
					ws.Write([]byte(fmt.Sprint(-a)))
					ws.Write([]byte("draw_" + chan_table[chan_table_index].p2))
					ws.Close()
					return
				}
			} else {
				ws.Write([]byte(fmt.Sprint(a)))
			}
			board[a] = 1
		}
	}
}

// func for playing game login
func (S wsserver) handl(ws *websocket.Conn) {

	fmt.Print("hello")
	res1 := strings.Split(ws.LocalAddr().String(), "/")
	if len(res1) < 5 {
		ws.Close()
	}
	// ws.Write([]byte("Hey"))
	temp1 := res1[5]
	gametoken, err := strconv.Atoi(temp1)
	if err != nil {
		fmt.Println("closed because of ", err)
		ws.Close()
		return
	}

	temp2 := make([]byte, 100)
	_, err = ws.Read(temp2)
	if err != nil {
		fmt.Println("closed because of ", err)
		ws.Close()
		return
	}
	user := string(temp2)
	fmt.Println(gametoken, user)

	c, i := selectchansyncdb(gametoken, user)
	// c := 0
	if c < 0 {
		ws.Write([]byte("close"))
		ws.Close()
		return
	}
	fmt.Printf("C : %v \n ", c)
	handlsocket(ws, user, S.chan_ls[c], i)
}

// temp := make([]byte, 1024)
// n, _ := ws.Read(temp)
// fmt.Print(string(temp[:n]))
// _, _ = ws.Write([]byte("bye bye"))
// ws.Close()
// if checkgamedb(gametoken) {
// if checkandaddplayeringame(gametoken, user) {

// }
// }
