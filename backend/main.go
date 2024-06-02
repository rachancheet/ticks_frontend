package main

import (
	"net/http"

	"golang.org/x/net/websocket"
)

func main() {

	mex := http.NewServeMux()

	s := NewWServer()

	// mex.Handle("/create_game/", http.HandlerFunc(create_game))
	// mex.Handle("/login/", http.HandlerFunc(login))
	// mex.Handle("/gethist/", http.HandlerFunc(gethist))
	mex.Handle("/ticks/game/", websocket.Handler(s.handl))
	// mex.HandleFunc("/ai", ai_game)
	mex.HandleFunc("/ticks/check", func(w http.ResponseWriter, r *http.Request) { w.Write([]byte("the server is working great")) })
	http.ListenAndServe(":8000", mex)

}
