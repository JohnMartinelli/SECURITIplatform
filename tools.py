import requests

class toolkit:
	def address2gps(self, GoogleAPIKey, outputType, address):
		
	  	# documentation available at https://developers.google.com/maps/documentation/geocoding/

		# 5 requests per second usage limit for free API, 10 for Maps API for Work users
		requestLimitPerSecond = 5

                url = "https://maps.googleapis.com/maps/api/geocode/" + outputType + "?key=" + GoogleAPIKey + "&address=" + address
                
		r = requests.get(url)
                print r.text
		return r.text
