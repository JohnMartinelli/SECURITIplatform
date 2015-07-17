# SECURITIplatform
# written by John Martinelli (johnnymartinelli@gmail.com)

# load our standard libraries

import argparse # shell argument passing
import requests # our go-to library for working with APIs
from pymongo import MongoClient # integrate with mongoDB
import datetime
import json
import safebrowsinglookup # Copyright 2015 Julien Sobrier, modified by Alexander Bikadorov

# load our internal-use-only libraries

import config # loads our configuration

import recon # loads our reconaissance class
             # def searchBusiness(self, GoogleAPIKey, outputType, lat, lng, searchType, keyword):

import tools # loads our tools
	     # def address2gps(self, GoogleAPIKey, address)

# set up argparse

parser = argparse.ArgumentParser(prog='SECURITIplatform', description='SECURITIplatform provides security insight into local business websites.')
parser.add_argument('--target', help='optionally, the IP/domain to target')
args = parser.parse_args()

# test/example configuration

target = "securiti.us"

# reconnaisance/information gathering 

reconWorker = recon.reconaissance() # instantiate our recon toolkit
toolsWorker = tools.toolkit()
safeBrowser = safebrowsinglookup.SafebrowsinglookupClient()

#scanWorker = scan.scanners()
#promoWorker = promo.promotion()

print "TEST 1: Convert Address to GPS Coordinates (Latitude, Longitude)"

address = "33069"
gpsCoordinates = toolsWorker.address2gps(config.GoogleAPIKey, config.outputType, address)
#from pprint import pprint
#pprint(gpsCoordinates) # print "[!] '" + address + "' GPS coordinates: " + gpsCoordinates[0] + "," + gpsCoordinates[1]
# results': [{u'address_componentsgeometry':locationlat
#gpsCoordinates = json.loads(gpsCoordinates)
#print "lat: " + gpsCoordinates

print "TEST 2: Search For Doctors in Area"

searchKeyword = "doctor"
latitude = "26.2286939"
longitude = "-80.1596041"
placeSearch = reconWorker.searchBusiness(config.GoogleAPIKey, config.outputType, latitude, longitude, searchKeyword)
resultsNumber = str(len(placeSearch))

print "[!] Found " + resultsNumber + " result(s) for '" + searchKeyword + "'."

print "TEST 3: GET PLACE DETAILS FROM Google Places API"

placeID = "ChIJ974-UVGx2YgRzO_knHqgjJY" # test placeID with bicycle shop
placeDetails = reconWorker.getDetails(config.GoogleAPIKey, config.outputType, placeID)
print "[!] Got details from " + placeID + "."

print "TEST 4: Get VHosts/Other Domains Hosted on IP [under construction]"

vhosts = toolsWorker.getVhosts(target)

print "TEST 4.1: Attempt To Ping Target"

pingable = toolsWorker.pingCheck(target)
print pingable

print "TEST 5: Use 'whatweb' to Identify the CMS"

whatwebResult = reconWorker.whatweb(target)
print "[whatweb] " + whatwebResult

print "TEST 6: Use 'joomscan' for Joomla sites, 'wpscan' for Wordpress sites, or 'wapiti' for Unknown CMS sites to identify vulnerabilities"

cmsType = reconWorker.whatCMS(whatwebResult)

print "[$] CMS is " + cmsType

scanResults = reconWorker.scan(target, cmsType)
print scanResults

print "TEST 7: Generate 'Exposure Level' by ranking target vulnerabilities"

exposureLevel = reconWorker.getExposure(scanResults, cmsType)
print "[!] Exposure Level: " + exposureLevel

print "TEST 8: Query Google's SafeBrowsing API"

newSafeBrowser = safeBrowser.lookup(target) 
print newSafeBrowser
print "TEST 9: Push all data to mongoDB"

mongoClient = MongoClient()
db = mongoClient.securiti
localDetails = db.localDetails

print "TEST 10: Push all vulnerable targets to sugarCRM"

print "TEST 11: Upload JSON file of all businesses (ref: test 3)"

with open("./details") as f:
	for line in f:
		from bson.json_util import loads
		from pprint import pprint
		placeCheck = localDetails.find({"result.place_id": line.rstrip()}).count()
	
		if placeCheck == 0: # make sure our database doesn't already have this place_id
			placeDetails = reconWorker.getDetails(config.GoogleAPIKey, config.outputType, line)
			deserializedJSON = loads(placeDetails)
			if deserializedJSON['status'] != "OK":
				import time
				time.sleep(86400)
				placeDetails = reconWorker.getDetails(config.GoogleAPIKey, config.outputType, line)
                        	deserializedJSON = loads(placeDetails) 
			localDetails.insert(deserializedJSON)		

print "TEST 12: Scrape e-mail addresses of vulnerable businesses"

print "TEST 13: Find competing companies on SERP page (http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=belle%20vernon%20chiropractors)"

print "TEST 14: Generate Google Map showing color-coded vulnerability"

print "TEST 15: Implement Flask for a web-based GUI"

print "TEST 16: Send e-mail blast through Mandrill"


print "TEST 16: Send e-mail blast through Mandrill"

print "TEST 17: Send postcard to physical address of vulnerable businesses"
