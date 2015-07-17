import requests

class reconaissance:

        def searchBusiness(self, GoogleAPIKey, outputType, lat, lng, keyword):

		# documentation available at https://developers.google.com/places/webservice/search

		# keep in mind &rankby= can take prominence(default) OR distance
		# keyword, name, or types (https://developers.google.com/places/supported_types) should be passed as 'searchType'

                url = "https://maps.googleapis.com/maps/api/place/radarsearch/" + outputType + "?key=" + GoogleAPIKey + "&location=" + lat + "," + lng + "&keyword=" + keyword + "&radius=50000"
		r = requests.get(url)
		return r.text

	def getDetails(self, GoogleAPIKey, outputType, placeID):

		# documentation available at https://developers.google.com/places/webservice/search

		# given a Google place_id, get all of the [non-Google Apps for Work] data 

		url = "https://maps.googleapis.com/maps/api/place/details/" + outputType + "?key=" + GoogleAPIKey + "&placeid=" + placeID.rstrip()
		
		r = requests.get(url)
		return r.text

	def whatweb(self, domain):

		# leverage installed 'whatweb' software to gather intelligence on our target
		
		import subprocess
		whatwebOutput = subprocess.Popen("/usr/bin/whatweb %s " % domain, shell=True, stdout=subprocess.PIPE).stdout.read()
		return whatwebOutput
	
	def scan(self, domain, cmsType): 

                # leverage installed 'wpscan' software to scan target for WordPress vulnerabilities

                import subprocess
                if cmsType == "WordPress":
			scanOutput = subprocess.Popen("./dependencies/wpscan/wpscan.rb -u %s --batch --no-color --force" % domain, shell=True, stdout=subprocess.PIPE).stdout.read()
		elif cmsType == "Joomla":
			scanOutput = subprocess.Popen("./dependencies/joomscan/joomscan.pl -u %s " % domain, shell=True, stdout=subprocess.PIPE).stdout.read()
		else:
			scanOutput = subprocess.Popen("/usr/bin/wapiti %s " % domain, shell=True, stdout=subprocess.PIPE).stdout.read()
			
                return scanOutput

	def whatCMS(self, whatwebResult):

		if "WordPress" in whatwebResult:
			return "WordPress"
		elif "Joomla" in whatwebResult:
			return "Joomla"
		else:
			return "Unknown"

	def getExposure(self, scanResults, scanType):
			
		exposureScore = len(scanResults) # temporarily rank exposure based on size of scan results
		return str(exposureScore)

