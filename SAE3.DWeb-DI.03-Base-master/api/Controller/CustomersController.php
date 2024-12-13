<?php
require_once ("Controller.php");
require_once ("Repository/CustomersRepository.php");

class CustomersController extends Controller {
    
    private CustomersRepository $customers;
    
    public function __construct() {
        $this->customers = new CustomersRepository();
    }
    
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id) {
            $customer = $this->customers->find($id);
            return $customer == null ? false : $customer;
        } else {
            return $this->customers->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        $id = $request->getId();
    
        if ($id == "add") {
            $first_name = $request->getParam("first_name");
            $last_name = $request->getParam("last_name");
            $email = $request->getParam("email");
            $country = $request->getParam("country");
            $city = $request->getParam("city");
            $lat = $request->getParam("lat");
            $lng = $request->getParam("lng");
    
            $customerData = [];
            $customerData["first_name"] = $first_name;
            $customerData["last_name"] = $last_name;
            $customerData["email"] = $email;
            $customerData["country"] = $country;
            $customerData["city"] = $city;
            $customerData["lat"] = $lat;
            $customerData["lng"] = $lng;
    
            $this->customers->save($customerData);
            return true;
        }
    }
    
    protected function processPutRequest(HttpRequest $request) {
        $id = $request->getId();
        $first_name = $request->getParam("first_name");
        $last_name = $request->getParam("last_name");
        $email = $request->getParam("email");
        $country = $request->getParam("country");
        $city = $request->getParam("city");
        $lat = $request->getParam("lat");
        $lng = $request->getParam("lng");
    
        $customerData = [];
        $customerData["first_name"] = $first_name;
        $customerData["last_name"] = $last_name;
        $customerData["email"] = $email;
        $customerData["country"] = $country;
        $customerData["city"] = $city;
        $customerData["lat"] = $lat;
        $customerData["lng"] = $lng;
    
        $this->customers->update($id, $customerData);
        return true;
    }
    
    protected function processDeleteRequest(HttpRequest $request) {
        $id = $request->getId();
        $this->customers->delete($id);
        return true;
    }
}