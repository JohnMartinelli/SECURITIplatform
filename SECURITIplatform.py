# SECURITIplatform
# written by John Martinelli (johnnymartinelli@gmail.com)

# load our standard libraries

import requests

# load our internal-use-only libraries

import config # loads our configuration

import recon # loads our reconaissance class
             # def searchBusiness(self, GoogleAPIKey, outputType, lat, lng, searchType, keyword):

import tools # loads our tools
	     # def address2gps(self, GoogleAPIKey, address)

# reconnaisance/information gathering 

reconWorker = recon.reconaissance() # instantiate our recon toolkit
toolsWorker = tools.toolkit()
#scanWorker = scan.scanners()
#promoWorker = promo.promotion()

print "TEST 1: Convert Address to GPS Coordinates (Latitude, Longitude)"

address = "33069"
gpsCoordinates = toolsWorker.address2gps(config.GoogleAPIKey, config.outputType, address)

print "TEST 2: Search For Doctors in Area"

searchKeyword = "doctor"
latitude = "26.2286939"
longitude = "-80.1596041"
placeSearch = reconWorker.searchBusiness(config.GoogleAPIKey, config.outputType, latitude, longitude, "prominence", searchKeyword)

print "TEST 3: GET PLACE DETAILS FROM Google Places API"

placeID = "ChIJ974-UVGx2YgRzO_knHqgjJY" # test placeID with bicycle shop
placeDetails = reconWorker.getDetails(config.GoogleAPIKey, config.outputType, placeID)

print "TEST 4: Get VHosts/Other Domains Hosted on IP [under construction]"

target = "www.securiti.us"
vhosts = toolsWorker.getVhosts(target)

print "TEST 5: Use 'whatweb' to Identify the CMS"

target = "www.securiti.us"
cmsType = reconWorker.whatweb(target)
print cmsType

print "TEST 6: Use 'joomscan' for Joomla sites, 'wpscan' for Wordpress sites, or 'wapiti' for Unknown CMS sites to identify vulnerabilities"

target = "www.securiti.us"
wpscanResults = reconWorker.wpscan(target)
print wpscanResults

# TEST 7: Push all data to mongoDB

# TEST 8: Implement Flask for a web-based GUI

# TEST 9: Upload JSON file of all businesses (ref: test 3) 

# TEST 10: Scrape e-mail addresses of vulnerable businesses

# TEST 11: Send e-mail blast through Mandrill

# TEST 12: Send postcard to physical address of vulnerable businesses
