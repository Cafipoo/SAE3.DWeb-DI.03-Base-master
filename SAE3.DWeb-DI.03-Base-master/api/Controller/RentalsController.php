<?php 
require_once ("Controller.php");
require_once ("Repository/RentalsRepository.php");

class RentalsController extends Controller {
    
    private RentalsRepository $rentals;
    
    public function __construct() {
        $this->rentals = new RentalsRepository();
    }
    
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id) {
            if ($id == "rentalThisMonth") {
                return $this->rentals->getTotalRentalsForThisMonth();
            } 
            else if ($id == "rentalEvolution") {
                return $this->rentals->getRentalsEvolution();
            }
            else if ($id == "rentalGenreEvolution") {
                return $this->rentals->rentalGenreEvolution();
            }
            else if ($id == "rentalByCountry") {
                return $this->rentals->rentalByCountry();
            }

            else {
                $rental = $this->rentals->find($id);
                return $rental == null ? false : $rental;
            }
        } else {
            return $this->rentals->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        $customer_id = $request->getParam("customer_id");
        $movie_id = $request->getParam("movie_id");
        $rental_date = $request->getParam("rental_date");
        $return_date = $request->getParam("return_date");
    
        $rentalData = [];
        $rentalData["customer_id"] = $customer_id;
        $rentalData["movie_id"] = $movie_id;
        $rentalData["rental_date"] = $rental_date;
        $rentalData["return_date"] = $return_date;
    
        $this->rentals->insert($rentalData);
        return true;
    }
    
    protected function processPutRequest(HttpRequest $request) {
        $id = $request->getId();
        $customer_id = $request->getParam("customer_id");
        $movie_id = $request->getParam("movie_id");
        $rental_date = $request->getParam("rental_date");
        $return_date = $request->getParam("return_date");
    
        $rentalData = [];
        $rentalData["customer_id"] = $customer_id;
        $rentalData["movie_id"] = $movie_id;
        $rentalData["rental_date"] = $rental_date;
        $rentalData["return_date"] = $return_date;
    
        $this->rentals->update($id, $rentalData);
        return true;
    }
    
    protected function processDeleteRequest(HttpRequest $request) {
        $id = $request->getId();
        $this->rentals->delete($id);
        return true;
    }
}

?>
