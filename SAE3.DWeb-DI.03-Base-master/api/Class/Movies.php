<?php

class Movies implements JsonSerializable {
    private int $id;
    private string $title;
    private string $genre;
    private string $releaseDate;
    private string $duration_minutes;
    private string $rating;

    public function __construct(array $data){
        $this->id = $data["id"];
        $this->movie_title = $data["movie_title"];
        $this->genre = $data["genre"];
        $this->releaseDate = $data["release_date"];
        $this->duration_minutes =$data["duration_minutes"];
        $this->rating =$data["rating"];
    }

    public function getId(): int
    {
        return $this->id;
    }
    public function getTitle(): string
    {
        return $this->movie_title;
    }
    public function getGenre(): string
    {
        return $this->genre;
    }
    public function getReleaseDate(): string
    {
        return $this->releaseDate;
    }

    public function getDuration(): string
    {
        return $this->duration_minutes;
    }

    public function getRating(): string
    {
        return $this->rating;
    }

    public function jsonSerialize() : mixed
    {
        return [
            "id" => $this->id,
            "movie_title" => $this->movie_title,
            "genre" => $this->genre,
            "release_date" => $this->releaseDate,
            "duration_minutes" => $this->duration_minutes,
            "rating" => $this->rating
        ];
    }

    public function setId($id): self
    {
        $this->id = $id;
        return $this;
    }

    public function setTitle($movie_title): self
    {
        $this->movie_title = $movie_title;
        return $this;
    }

    public function setGenre($genre): self
    {
        $this->genre = $genre;
        return $this;
    }

    public function setReleaseDate($releaseDate): self    
    {
        $this->releaseDate = $releaseDate;
        return $this;
    }

    public function setDuration($duration_minutes): self    
    {
        $this->duration_minutes = $duration_minutes;
        return $this;
    }

    public function setRating($rating): self    
    {
        $this->rating = $rating;
        return $this;
    }
}