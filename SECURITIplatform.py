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

# TEST 1: Convert Address to GPS Coordinates (Latitude, Longitude)

address = "33069"
gpsCoordinates = toolsWorker.address2gps(config.GoogleAPIKey, config.outputType, address)

# TEST 2: Search For Doctors in Area

searchKeyword = "doctor"
placeSearch = reconWorker.searchBusiness(config.GoogleAPIKey, config.outputType, latitude, longitude, "prominence", searchKeyword)

# TEST 3: GET PLACE DETAILS FROM Google Places API

placeID = "ChIJ974-UVGx2YgRzO_knHqgjJY" # test placeID with bicycle shop
placeDetails = reconWorker.getDetails(config.GoogleAPIKey, config.outputType, placeID)

# TEST 4: Use 'whatweb' to Identify the CMS

cmsType = reconWorker.whatweb(target)

# TEST 5: Use 'joomscan' for Joomla sites, 'wpscan' for Wordpress sites, or 'wapiti' for Unknown CMS sites to identify vulnerabilities

# TEST 6: Push all data to mongoDB

# TEST 7: Implement Flask for a web-based GUI

# TEST 8: Upload JSON file of all businesses (ref: test 3) 

# TEST 9: Scrape e-mail addresses of vulnerable businesses

# TEST 10: Send postcard to physical address of vulnerable businesses
