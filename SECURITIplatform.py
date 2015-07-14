# SECURITIplatform
# written by John Martinelli (johnnymartinelli@gmail.com)

# load our standard libraries

import argparse # easy shell argument passing
import requests # our go-to library for working with APIs

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
print args
# test/example configuration

target = "securiti.us"

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

vhosts = toolsWorker.getVhosts(target)

print "TEST 5: Use 'whatweb' to Identify the CMS"

whatwebResult = reconWorker.whatweb(target)
print whatwebResult

print "TEST 6: Use 'joomscan' for Joomla sites, 'wpscan' for Wordpress sites, or 'wapiti' for Unknown CMS sites to identify vulnerabilities"

cmsType = reconWorker.whatCMS(whatwebResult)

print "[$] CMS is " + cmsType

scanResults = reconWorker.scan(target, cmsType)
print scanResults

# print "TEST 7: Generate 'Exposure Level' by ranking target vulnerabilities

exposureLevel = reconWorker.getExposure(scanResults, cmsType)
print "Exposure Level: " + exposureLevel

# TEST 8: Push all data to mongoDB

# TEST 9: Push all vulnerable targets to sugarCRM

# TEST 10: Generate Google Map showing color-coded vulnerability

# TEST 11: Implement Flask for a web-based GUI

# TEST 12: Upload JSON file of all businesses (ref: test 3) 

# TEST 13: Scrape e-mail addresses of vulnerable businesses

# TEST 14: Send e-mail blast through Mandrill

# TEST 15: Send postcard to physical address of vulnerable businesses
