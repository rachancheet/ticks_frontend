package main

import (
	"fmt"
	"log"
)

// _ "github.com/lib/pq"

// var db *sql.DB
var chan_top int
var chan_table []chan_tab

type chan_tab struct {
	gametoken  int
	p1         string
	p2         string
	chan_index int
}

func init() {

	// connStr := "postgresql://postgres:2206@localhost/tic_tack?sslmode=disable"
	// // Connect to database
	// var err error
	// db, err = sql.Open("postgres", connStr)
	// handlerr(err)
	chan_top = 0
	chan_table = make([]chan_tab, 1)

}

func selectchansyncdb(gametoken int, user string) (int, int) {

	//db query if gametoken has chan then return chan_int
	//else add chan_top to gametoken chan_int and return chan_top
	//if chan >1000 erro

	fmt.Println("\n", gametoken, user, chan_top)

	fmt.Println(chan_table)
	i := 0
	for ; i < len(chan_table); i++ {
		if (chan_table)[i].gametoken == gametoken {

			if (chan_table)[i].p2 != "" {
				return -1, -1
			}
			(chan_table)[i].p2 = user
			return (chan_table)[i].chan_index, i
		}
	}
	if i == len(chan_table) {
		fmt.Println("\n", "adding new to chan table", chan_top)
		chan_index := chan_top
		chan_table = append(chan_table, chan_tab{gametoken, user, "", chan_index})
		chan_top = (chan_top + 1) % 100
		return chan_index, i

	}
	return -1, -1

	// row, err := db.Query(fmt.Sprintf("select chan_index,coalesce(p1,'-1'),coalesce(p2,'-1') from chan_table where game_token=%v ;", gametoken))
	// handlerr(err)

	// fmt.Println("\n", err)
	// defer row.Close()

	// var chan_index int

	// row.Next()
	// var p2 string
	// var p1 string

	// err = row.Scan(&chan_index, &p1, &p2)
	// if err != nil {
	// 	chan_index = *chan_top
	// 	fmt.Println("\n", gametoken, user, chan_index)
	// 	query := fmt.Sprintf("insert into chan_table(game_token,p1,chan_index) values(%v,'%v',%v);", gametoken, user, chan_index)

	// 	// resp, err := db.Exec(string(query))
	// 	db.QueryRow(query)
	// 	// fmt.Print(resp)
	// 	// handlerr(err)
	// 	fmt.Print(*chan_top)

	// 	*chan_top = *chan_top + 1

	// 	return chan_index
	// }
	// if p2 == "-1" {
	// 	db.QueryRow(fmt.Sprintf("update chan_table set p2='%v' where game_token=%v", user, gametoken))
	// 	handlerr(err)
	// 	return chan_index
	// }
	// return -1
}

// func gengametoken(user string) {
// 	// token := rand.Intn(10000)
// 	//insert
// }

// func jwt

// func gethisuserdb(user string) string {
// 	row, err := db.Query(fmt.Sprintf("select game_hist from user_table where name='%v' ;", user))
// 	handlerr(err)
// 	row.Next()
// 	var hist string
// 	row.Scan(&hist)
// 	return hist

// }

func handlerr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

// func main() {
// 	chan_top := 0
// 	selectchansyncdb("1232", "r", &chan_top)
// }

// func main() {
// fmt.Print(gethisuserdb("rachan"))

// user:="raxx"
// row, err := db.Query(fmt.Sprintf("select game_hist from user_table where user='%v' ;", user))
// row.Next()
// row.Scan()

// gametoken := 69
// row, err := db.Query(fmt.Sprintf("select chan_index,coalesce(p2,'-1')from chan_table where game_token=%v ;", gametoken))
// handlerr(err)
// defer row.Close()

// row.Next()
// var chan_index int
// var p1 string
// err = row.Scan(&chan_index, &p1)
// handlerr(err)

// if p1 == "-1" {
// 	fmt.Print("haye daiya")
// }
// fmt.Print(chan_index, p1)

// connStr := "postgresql://postgres:2206@localhost/tic_tack?sslmode=disable"
// // Connect to database
// db, err := sql.Open("postgres", connStr)
// handlerr(err)

// res, err := db.Exec("insert into user_table values('rachan','1 paraga');")
// handlerr(err)
// fmt.Print(res)

// row, err := db.Query("select * from tweets order by likes desc ;")
// handlerr(err)
// defer row.Close()

// err = nil
// for err == nil {

// 	row.Next()
// 	err = row.Scan()

// 	if err == nil {
// 		//append to list here
// 	}

// }
// }
