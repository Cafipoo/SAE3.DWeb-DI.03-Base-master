<?php 
require_once ("Controller.php");
require_once ("Repository/SalesRepository.php");

class SalesController extends Controller {
    
    private SalesRepository $sales;
    
    public function __construct() {
        $this->sales = new SalesRepository();
    }
    
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id) {
            if ($id == "total-for-december") {
                return $this->getTotalSalesForDecember();
            } else {
                $sale = $this->sales->find($id);
                return $sale == null ? false : $sale;
            }
        } else {
            return $this->sales->findAll();
        }
    }
    private function getTotalSalesForDecember() {
        $totalSales = $this->sales->getTotalSalesForDecember();
        return ["total" => $totalSales];
    }
    
    protected function processPostRequest(HttpRequest $request) {
        $id = $request->getId();
    
        if ($id == "add") {
            $customer_id = $request->getParam("customer_id");
            $movie_id = $request->getParam("movie_id");
            $purchase_date = $request->getParam("purchase_date");
            $purchase_price = $request->getParam("purchase_price");
    
            $saleData = [];
            $saleData["customer_id"] = $customer_id;
            $saleData["movie_id"] = $movie_id;
            $saleData["purchase_date"] = $purchase_date;
            $saleData["purchase_price"] = $purchase_price;
    
            $this->sales->insert($saleData);
            return true;
        }
    }
    
    protected function processPutRequest(HttpRequest $request) {
        $id = $request->getId();
        $customer_id = $request->getParam("customer_id");
        $movie_id = $request->getParam("movie_id");
        $purchase_date = $request->getParam("purchase_date");
        $purchase_price = $request->getParam("purchase_price");
    
        $saleData = [];
        $saleData["customer_id"] = $customer_id;
        $saleData["movie_id"] = $movie_id;
        $saleData["purchase_date"] = $purchase_date;
        $saleData["purchase_price"] = $purchase_price;
    
        $this->sales->update($id, $saleData);
        return true;
    }
    
    protected function processDeleteRequest(HttpRequest $request) {
        $id = $request->getId();
        $this->sales->delete($id);
        return true;
    }
}

?>
