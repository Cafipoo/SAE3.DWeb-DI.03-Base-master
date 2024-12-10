<?php 
require_once ("Controller.php");
require_once ("Repository/MoviesRepository.php");

class MoviesController extends Controller {
    
    private MoviesRepository $movies;
    
    public function __construct() {
        $this->movies = new MoviesRepository();
    }
    
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id) {
            if ($id == "top3") {
                return $this->getTop3();
            } else {
                $sale = $this->movies->find($id);
                return $sale == null ? false : $sale;
            }
        } else {
            return $this->movies->findAll();
        }
    }
    private function getTop3() {
        $top3 = $this->movies->getTop3();
        return $top3;
    }
    
    protected function processPostRequest(HttpRequest $request) {
        $id = $request->getId();
    
        if ($id == "add") {
            $movie_title = $request->getParam("movie_title");
            $genre = $request->getParam("genre");
            $releaseDate = $request->getParam("release_date");
            $duration_minutes = $request->getParam("duration_minutes");
            $rating = $request->getParam("rating");
    
            $movieData = [];
            $movieData["movie_title"] = $movie_title;
            $movieData["genre"] = $genre;
            $movieData["release_date"] = $releaseDate;
            $movieData["duration_minutes"] = $duration_minutes;
            $movieData["rating"] = $rating;
    
            $this->movies->insert($movieData);
            return true;
        }
        // else {
        //     $title = $request->getParam("title");
        //     $genre = $request->getParam("genre");
        //     $releaseDate = $request->getParam("release_date");
    
        //     $movieData = [];
        //     $movieData["title"] = $title;
        //     $movieData["genre"] = $genre;
        //     $movieData["release_date"] = $releaseDate;
    
        //     $this->movies->update($id, $movieData);
        //     return true;
        // }
    }
    
    protected function processPutRequest(HttpRequest $request) {
        $id = $request->getId();
        $movie_title = $request->getParam("movie_title");
        $genre = $request->getParam("genre");
        $releaseDate = $request->getParam("release_date");
    
        $movieData = [];
        $movieData["movie_title"] = $movie_title;
        $movieData["genre"] = $genre;
        $movieData["release_date"] = $releaseDate;
    
        $this->movies->update($id, $movieData);
        return true;
    }
    
    protected function processDeleteRequest(HttpRequest $request) {
        $id = $request->getId();
        $this->movies->delete($id);
        return true;
    }
}

?>