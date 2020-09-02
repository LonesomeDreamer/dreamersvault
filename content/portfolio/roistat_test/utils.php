<?php

require 'vendor/autoload.php';
use zcrmsdk\crm\exception\ZCRMException;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;
use zcrmsdk\oauth\ZohoOAuth;
use zcrmsdk\oauth\exception\ZohoOAuthException;
use zcrmsdk\oauth\utility\ZohoOAuthConstants;
use zcrmsdk\crm\crud\ZCRMRecord;

$info_msg = "";

if (isset($_POST["phone"])) {
  startZCRM();
}

/**
* Initialize Zoho CRM
*
* @param none
* @return none
*/
function startZCRM() {
  $configuration=array("client_id"=>"1000.SCGCJVTGWCA4QVA8SAPLHVCYQCYTWH","client_secret"=>"e2743283473858b9a0a9c93660a474e21f4f05ad9c","redirect_uri"=>"http://dreamersvault.atwebpages.com/content/portfolio/roistat_test/","currentUserEmail"=>"slivintestmail@gmail.com", "token_persistence_path"=>$_SERVER['DOCUMENT_ROOT']. "/content/portfolio/roistat_test/TokenStorage"/*, "apiBaseUrl"=>"www.zohoapis.com", "accounts_url"=>"accounts.zoho.com"*/);
  ZCRMRestClient::initialize($configuration);
  $oAuthClient = ZohoOAuth::getClientInstance();
  $refreshToken = "1000.8e720fa60636f7dc7c9ff88bc1df2c89.e380bd58baded764b414dbbade1312f1";
  $userIdentifier = "slivintestmail@gmail.com";
  try {
    $oAuthClient->generateAccessTokenFromRefreshToken($refreshToken,$userIdentifier);
  } catch (Exception $e) {
    echo "Error in OAuth 2.0 Access token.";
  }

  // get Lead's ID
  $lead_id = parsePOSTData($_POST['phone']);
  // Lead does not exist in CRM yet
  if (!$lead_id) {
    createLead();
  } else {
  // Lead exists in CRM already. Creatind a Deal
    createDeal($lead_id, $_POST['phone']);
  };
}

/**
* Parse data sent from user via form
*
* @param string $phone phone number of Lead
* @return string $records[0]->getEntityId() ID of Lead
*/
function parsePOSTData($phone) {
  global $info_msg;
  $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Leads");
  try {
    $response = $moduleIns->searchRecordsByPhone("$phone") ;
    $records = $response->getData();
    $info_msg = "Лид конвертирован в Сделку";
    return $records[0]->getEntityId();
  } catch (ZCRMException $ex) {
    $info_msg =  "Лид создан";
    return false;
  }
}

/**
* Create a Deal and tie Contact to it
*
* @param string $lead_id ID of Lead
* @param string $phone phone of Contact
* @return none
*/
function createDeal($lead_id, $phone) {
  $contact_id = contactExists($phone);
  if (!$contact_id) {
    CreateContactAndDeal($lead_id);
  } else {
    CreateContactAndDeal($lead_id, $contact_id);
  }
}

/**
* Check if Contact already exists
*
* @param string $phone phone of Contact
* @return string $records[0]->getEntityId() ID of Contact
*/
function contactExists($phone) {
  $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Contacts");
  try {
    $response = $moduleIns->searchRecordsByPhone("$phone") ;
    $records = $response->getData();
    return $records[0]->getEntityId();
  } catch (ZCRMException $ex) {
    return false;
  }
}

/**
* Create Contact and add Contact into Deal's data
*
* @param string $lead_id ID of Lead
* @param string $contact_id ID of Contact
* @return none
*/
function CreateContactAndDeal($lead_id, $contact_id = 0) {
  $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Leads"); // To get module instance
  $response = $moduleIns->getRecord($lead_id); // To get module record
  $record = $response->getData(); // To get response data
  $name = $record->getFieldValue("First_Name");
  $surname = $record->getFieldValue("Last_Name");
  $record = ZCRMRestClient::getInstance()->getRecordInstance("Leads", $lead_id); // To get record instance
  $deal = ZCRMRecord::getInstance("deals", Null); // to get the record of deal in form of ZCRMRecord insatnce
  $deal->setFieldValue("Deal_Name", "From $name $surname ($lead_id)"); // to set the deal name
  $deal->setFieldValue("Stage", "Qualification"); // to set the stage
  $deal->setFieldValue("Closing_Date", "2022-03-30"); // to set the closing date
  if ($contact_id != 0) {
    $details = array("overwrite"=>TRUE,"notify_lead_owner"=>TRUE,"notify_new_entity_owner"=>TRUE, "Contacts"=>$contact_id);
  } else {
      $details = array("overwrite"=>TRUE,"notify_lead_owner"=>TRUE,"notify_new_entity_owner"=>TRUE);
  }
  try {
    $responseIn = $record->convert($deal, $details); // to convert record
  } catch (ZCRMException $ex) {
    return true;
  }
}

/**
* Create new Lead
*
* @param none
* @return none
*/
function createLead() {
  $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Leads"); // To get module instance
  $records=array();
  $record=ZCRMRecord::getInstance("Leads",null);  //To get ZCRMRecord instance
  $record->setFieldValue("First_Name", $_POST['name']);
  $record->setFieldValue("Last_Name", $_POST['surname']);
  $record->setFieldValue("Phone", $_POST['phone']);
  $record->setFieldValue("Email", $_POST['email']);
  $record->setFieldValue("City", $_POST['city']);
  $record->setFieldValue("Company", $_POST['company']);
  array_push($records, $record);
  $responseIn = $moduleIns->createRecords($records);
}
?>
