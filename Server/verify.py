from bs4 import BeautifulSoup
import requests
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def verify_online_presence(website):
    if not website:
        return 30  # High risk if no website is provided

    try:
        response = requests.get(website)
        if response.status_code != 200:
            return 20  # Medium risk if website is not accessible

        soup = BeautifulSoup(response.content, 'html.parser')
        content = soup.get_text().lower()
        relevant_keywords = ['food bank', 'donation', 'charity', 'volunteer']
        keyword_count = sum(content.count(keyword) for keyword in relevant_keywords)

        if keyword_count < 10:
            return 20  # Medium risk if relevant content is scarce

        social_media_links = soup.find_all('a', href=re.compile(r"facebook|twitter|instagram"))
        if len(social_media_links) < 2:
            return 10  # Low risk if social media links are few

        return 0  # No risk if the website is valid, relevant, and active

    except Exception as e:
        print(f"Error accessing website: {e}")
        return 30  # High risk if the website cannot be accessed

def analyze_reputation(name):
    api_key = "AIzaSyDGKl8zOJvFYABUyYZMrOBfG6RzuiSnaQQ"
    search_engine_id = "f100e28154b72448d"
    search_query = f"{name} reviews OR complaints OR feedback"
    search_url = f"https://www.googleapis.com/customsearch/v1?key={api_key}&cx={search_engine_id}&q={search_query}"

    try:
        response = requests.get(search_url)
        response.raise_for_status()
        search_results = response.json()

        snippets = [item['snippet'] for item in search_results.get('items', [])]
        analyzer = SentimentIntensityAnalyzer()
        sentiments = [analyzer.polarity_scores(snippet)['compound'] for snippet in snippets]

        if not sentiments:
            return 10  # Low risk if no reviews found

        avg_sentiment = sum(sentiments) / len(sentiments)

        if avg_sentiment < -0.3:
            return 40  # High risk
        elif avg_sentiment < 0:
            return 20  # Medium risk
        else:
            return 0  # Low risk

    except requests.RequestException as e:
        print(f"Network error: {e}")
        return 30
    except ValueError as e:
        print(f"JSON parsing error: {e}")
        return 30
    except Exception as e:
        print(f"Unexpected error: {e}")
        return 30

def verify_foodbank_registration(foodbank_details):
    address = foodbank_details.get('address')
    website = foodbank_details.get('website')
    name = foodbank_details.get('name')

    
    online_risk = verify_online_presence(website)
    reputation_risk = analyze_reputation(name)

    total_risk = online_risk + reputation_risk

    if total_risk <= 30:
        return {"status": "Approved", "risk_score": total_risk}
    elif total_risk <= 70:
        return {"status": "Manual Review Required", "risk_score": total_risk}
    else:
        return {"status": "Rejected", "risk_score": total_risk}