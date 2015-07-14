import requests

class reconaissance:

        def searchBusiness(self, GoogleAPIKey, outputType, lat, lng, searchType, keyword):

		# documentation available at https://developers.google.com/places/webservice/search

		# keep in mind &rankby= can take prominence(default) OR distance
		# keyword, name, or types (https://developers.google.com/places/supported_types) should be passed as 'searchType'

                url = "https://maps.googleapis.com/maps/api/place/search/" + outputType + "?key=" + GoogleAPIKey + "&lat=" + lat + "&lng=" + lng + "&" + searchType + "=" + keyword
                
		r = requests.get(url)
                print r.text
		return r.text

	def getDetails(self, GoogleAPIKey, outputType, placeID):

		# documentation available at https://developers.google.com/places/webservice/search

		# given a Google place_id, get all of the [non-Google Apps for Work] data 

		url = "https://maps.googleapis.com/maps/api/place/details/" + outputType + "?key=" + GoogleAPIKey + "&placeid=" + placeID
		
		r = requests.get(url)
		print r.text
		return r.text

	def whatweb(self, domain):

		# leverage installed 'whatweb' software to gather intelligence on our target
		
		import subprocess
		whatwebOutput = subprocess.Popen("/usr/bin/whatweb %s " % domain, shell=True, stdout=subprocess.PIPE).stdout.read()
		return whatwebOutput
	
	def wpscan(self, domain): 

                # leverage installed 'wpscan' software to scan target for WordPress vulnerabilities

                import subprocess
                
		wpscanOutput = subprocess.Popen("./dependencies/wpscan/wpscan.rb --batch --force -u %s " % domain, shell=True, stdout=subprocess.PIPE).stdout.read()
                return wpscanOutput
