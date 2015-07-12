import requests

class reconaissance:
	def getDetails(self, GoogleAPIKey, outputType, placeID):
		url = "https://maps.googleapis.com/maps/api/place/details/" + outputType + "?key=" + GoogleAPIKey + "&placeid=" + placeID
		# self.details = "the details from " + placeID + ":\n"
		r = requests.get(url)
		print r.text
