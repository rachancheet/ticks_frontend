package main

// import (
// 	"net/http"
// 	"strings"
// )

// func create_game(w http.ResponseWriter, r *http.Request) {
// 	// gen token return
// 	// user := strings.Split(r.URL.Path, "/")[1]
// 	// fmt.Print(user)
// 	token := gengametoken(user)
// 	w.Write([]byte(token))
// }

//	func login(w http.ResponseWriter, r *http.Request) {
//		user := strings.Split(r.URL.Path, "/")[1]
//		fmt.Print(user)
//		token := jwt(user)
//		w.Write([]byte(token))
//	}
// func gethist(w http.ResponseWriter, r *http.Request) {
// 	user := strings.Split(r.URL.Path, "/")[1]
// 	hist := gethisuserdb(user)
// 	w.Write([]byte(hist))
// }
