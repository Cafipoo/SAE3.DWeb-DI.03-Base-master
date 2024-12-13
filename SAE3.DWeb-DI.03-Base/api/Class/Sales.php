<?php

class Sales implements JsonSerializable {
    private int $id;
    private string $customer_id;
    private string $movie_id;
    private string $purchase_date;
    private string $purchase_price;

    public function __construct(array $data){
        $this->id = $data["id"];
        $this->customer_id = $data["customer_id"];
        $this->movie_id = $data["movie_id"];
        $this->purchase_date = $data["purchase_date"];
        $this->purchase_price = $data["purchase_price"];
    }

    public function getId(): int
    {
        return $this->id;
    }
    public function getCustomerId(): string
    {
        return $this->customer_id;
    }
    public function getMovieId(): string
    {
        return $this->movie_id;
    }
    public function getPurchaseDate(): string
    {
        return $this->purchase_date;
    }

    public function getPurchasePrice(): string
    {
        return $this->purchase_price;
    }

    public function jsonSerialize() : mixed
    {
        return [
            "id" => $this->id,
            "customer_id" => $this->customer_id,
            "movie_id" => $this->movie_id,
            "purchase_date" => $this->purchase_date,
            "purchase_price" => $this->purchase_price
        ];
    }

    public function setId($id): self
    {
        $this->id = $id;
        return $this;
    }

    public function setCustomerId($customer_id): self
    {
        $this->customer_id = $customer_id;
        return $this;
    }

    public function setMovieId($movie_id): self
    {
        $this->movie_id = $movie_id;
        return $this;
    }

    public function setPurchaseDate($purchase_date): self    
    {
        $this->purchase_date = $purchase_date;
        return $this;
    }

    public function setPurchasePrice($purchase_price): self    
    {
        $this->purchase_price = $purchase_price;
        return $this;
    }
}
