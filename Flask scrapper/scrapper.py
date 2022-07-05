import requests
from bs4 import BeautifulSoup

LIMIT = 50

def get_last_page(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    pagination = soup.find('div',{'class':'pagination'})
    links = pagination.find_all("a")
    pages = []
    for link in links[:-1]:
        pages.append(int(link.string))
    max_page = pages[-1]
    return max_page

def extract_job(html):
    title = html.find("h2",{"class":"jobTitle"}).find("a").string
    company = html.find("span",{"class":"companyName"})
    if company:
        company_anchor = company.find("a")
        if company_anchor is not None:
            company = str(company_anchor.string)
        else:
            company = str(company.string)
        company = company.strip()
    else:
        company = None
    location = str(html.find("div",{"class":"companyLocation"}).text)
    job_id = html.find("h2",{"class":"jobTitle"}).find("a")["data-jk"]
    return {'title': title,'company': company, 'location': location, 'link': f"https://www.indeed.com/viewjob?jk={job_id}"}

def extract_jobs(last_page, url):
    jobs = []
    for page in range(last_page):
        print("Scrapping page ", page)
        result = requests.get(f"{url}&start={page*LIMIT}")
        soup = BeautifulSoup(result.text, "html.parser")
        results = soup.find_all("td",{"class": "resultContent"})
        for result in results:
            job = extract_job(result)
            jobs.append(job)
    return jobs

def get_jobs(word):
    url = f"https://www.indeed.com/jobs?as_and={word}&limit={LIMIT}"
    last_page = get_last_page(url)
    jobs = extract_jobs(last_page, url)
    return jobs