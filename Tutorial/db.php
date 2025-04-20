<?php 
    class Config {
        private $hostname = "localhost";
        private $username = "root";
        private $password = "Sachin@2002";
        private $database = "token_practice";
        public $conn;
        
        public function __construct() {
            $this->conn = new mysqli($this->hostname, $this->username, $this->password, $this->database);
            
            if($this->conn->connect_error){
                die("Connection Failed".$this->conn->connect_error);
            }
        }
    }
?>