# **장고의 기본 요소 공부**
> **장고의 기본적인 요소들을 ```파이보``` 라는 서비스를 만들면서 공부한 내용**
---
## **앱(App)**
* 장고를 개발하기 위해 프로젝트를 만들었다 하지만 프로젝트는 단독으로는 아무런 일도 할수 없음  
* 프로젝트에 기능을 추가하기 위해서는 앱을 생성해야 함
* 게시판 기능을 담당할 pybo 앱을 생성
* 명령 프롬프트에서 django-admin의 startapp 명령을 이용하여 pybo 앱을 생성
```
(mysite) C:\projects\mysite> django-admin startapp pybo
(mysite) C:\projects\mysite>
```
* 명령을 실행하면 아무런 메시지 없이 종료가 됨, 하지만 pybo 앱 관련한 파일과 디렉터리가 생성되었음을 확인할수 있음  
  
**Hello Pybo**
* 브라우저에서 ```http://localhost:8000/pybo``` 페이지를 요청했을 때 "안녕하세요 pybo에 오신것을 환영합니다." 라는 문자열을 출력하도록 만들기
* 로컬서버를 구동후 그냥 브라우저에서 ```http://localhost:8000/pybo``` 페이지를 요청시
![404Error](https://wikidocs.net/images/page/70649/O_2-01_1.png)
* 위 사진 처럼 "Page not found (404)" 라는 오류가 발생함
    * 여기서 404는 HTTP 오류코드 중 하나임
    * 404 오류는 브라우저가 요청한 페이지를 찾을 수 없을 경우에 발생
* 장고는 오류가 발생하면 오류의 원인을 화면에 자세히 보여주기 때문에 오류를 파악하기 쉬움
* 오류의 내용을 자세히 읽어보면 config/urls.py 파일에 요청한 pybo/ URL에 해당되는 매핑이 없다고 적혀 있음
* 그럼 나는 오류를 해결하기 위해 ```config/urls.py``` 파일에 ```pybo/``` URL에 대한 매핑을 추가해야 할 것이다
* 장고의 urls.py 파일은 페이지 요청이 발생하면 가장 먼저 호출되는 파일로 URL과 뷰 함수 간의 매핑을 정의함
* 뷰 함수는 views.py 파일에 정의된 함수를 말함  
  
**urls.py**
* URL 매핑을 추가하기 위해 ```config/urls.py``` 파일을 수정
```python
# urls.py
from django.contrib import admin
from django.urls import path

from pybo import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('pybo/', views.index),
]
```
* ```pybo/``` URL이 요청되면 ```views.index```를 호출하라는 매핑을 urlpatterns에 추가하였음
* ```views.index```는 views.py 파일의 index함수를 의미함
* urlpatterns에서 실제 URL은 ```http://localhost:8000/pybo```이지만 호스트명과 포트가 생략된 ```pybo/```로 매핑해야 함
    * 왜냐면 호스트와 포트는 서버가 어떤 환경에서 실행되는지에 따라 변하기 때문임
* 또 ```pybo/``` 를 ```pybo```라고 하지 않고 뒤에 슬래시(```/```)를 하나 더 붙여주었음
    * 뒤에 슬래시를 붙이게 되면 브라우저 주소창에 ```http://localhost:8000/pybo``` 라고 입력해도 자동으로 ```http://localhost:8000/pybo/```처럼 변환 됨
    * 이렇게 되는 이유는 URL을 정규화하는 장고의 기능 때문임
    * 특별한 경우가 아니라면 URL 매핑시 항상 끝에 슬래시를 붙여 주도록 하자  
  
**views.py**
* 다시 ```http://localhost:8000/pybo``` 페이지를 요청하면 "사이트에 연결할 수 없음" 이라는 오류가 화면에 표시됨
* 오류의 원인은 URL 매핑에 추가한 뷰 함수 ```views.index```가 없기 때문임
* 그럼 ```pybo/views.py``` 파일에 index 함수를 추가해야 함
```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("안녕하세요 pybo에 오신것을 환영합니다.")
```
* HttpResponse는 요청에 대한 응답을 할때 사용함
* 여기서는 "안녕하세요 pybo에 오신것을 환영합니다." 라는 문자열을 브라우저에 출력하기 위해 사용되었음
* index 함수의 매개변수 request는 HTTP 요청 객체임
* 뷰 함수를 작성하고 다시 ```http://localhost:8000/pybo``` 페이지를 요청하면 아래와 같은 화면을 볼수 있음
![welcom pybo](https://wikidocs.net/images/page/70649/O_2-01_2.png)  
  
**장고 개발 흐름 정리하기**
* 위의 내용은 앞으로 여러번 반복될것이므로 이과정은 매우 중요함
* 장고의 기본적인 흐름은 아래 사진과 같음
![장고 흐름](https://wikidocs.net/images/page/70649/2-01_6.png)
* ```[1]``` 브라우저에서 로컬 서버로 ```http://localhost:8000/pybo``` 페이지를 요청하면
* ```[2]``` urls.py 파일에서 ```/pybo``` URL 매핑을 확인하여 views.py 파일의 index 함수를 호출하고
* ```[3]``` 호출한 결과를 브라우저에 반영함  
  
**URL 분리**
* pybo앱에 관련한 것들은 pybo앱 디렉터리 하위에 위치해야함
* 하지만 이대로면 pybo와 관련된 URL 매핑을 추가할 때마다 ```config/urls.py```파일을 수정해야 함
* config의 urls.py파일은 앱이 아닌 프로젝트 성격의 파일이므로 이곳에는 프로젝트 성격의 URL 매핑만 추가되어야 함
* 따라서 pybo 앱에서만 사용하는 URL 매핑을 ```config/urls.py``` 파일에 계속 추가하는 것은 좋은 방법이 아님
* 먼저 ```config/urls.py``` 파일을 아래와 같이 수정
```python
# urls.py
from django.contrib import admin
from django.urls import path, include
# from pybo import views
# 위문장은 더 이상 필요하지 않으므로 삭제

urlpatterns = [
    path('admin/', admin.site.urls),
    path('pybo/', include('pybo.urls')), 
    #include 로 pybo.urls을 포함 시킴
]
```
* ```pybo/``` URL에 대한 매핑을 ```path('pybo/', views.index)``` 에서 ```path('pybo/', include('pybo.urls'))```로 수정했음
* ```path('pybo/', include('pybo.urls'))```의 의미는 ```pybo/```로 시작하는 페이지를 요청하면 이제 ```pybo/urls.py``` 파일의 매핑 정보를 읽어서 처리하라는 의미임
* 이제 ```pybo/question/create```, ```pybo/answer/create```등의 ```pybo/```로 시작하는 URL을 추가해야 할 때 ```config.py/urls.py``` 파일을 수정할 필요없이 ```pybo/urls.py```파일만 수정하면 됨
* ```pybo/urls.py``` 파일을 생성하고 아래와 같이 작성
```python
# urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
]
```
* 기존 ```config/urls.py```파일에 설정했던 내용과 별 차이가 없음
* 다만 ```path('', views.index)```처럼 ```pybo/```가 생략된 ```''```이 사용되었음
    * 이유는 ```config/urls.py``` 파일에서 이미 ```pybo/```로 시작하는 URL이 ```pybo/urls.py``` 파일과 먼저 매핑되었기 때문임
* 즉, ```pybo/``` URL은 다음처럼 ```config/urls.py```파일에 매핑된 ```pybo/```와 ```pybo/urls.py```파일에 매핑된 ```''```이 더해져 ```pybo/```가 됨
    |config/urls.py| |pybo/urls.py| |최종 URL|
    |:---:|:---:|:---:|:---:|:---:|
    |```'pybo/'```|+|```''```|=|```'pybo/'```|
    |```'pybo/'```|+|```question/create/'```|=|```'pybo/question/create/'```|
* 위의 두번째 예시처럼 ```pybo/urls.py``` 파일에 ```path('question/create/', ...)``` 라는 URL매핑이 추가된다면 최종 매핑되는 URL은 ```pybo/```가 더해진 ```pybo/question/create/```가 됨
* 다시 ```http://localhost:8000/pybo```페이지를 요청해보면 URL 분리 후에도 동일한 결과가 나타난다는 것을 확인 가능
---
## **모델**
* 장고는 모델(Model)을 이용하여 데이터베이스를 처리함
* 보통 데이터베이스에 데이터를 저장하고 조회하기 위해서 SQL 쿼리문을 이용해야 하지만 장고의 모델(Model)을 사용하면 이런 SQL 쿼리문 도움없이 데이터를 쉽게 처리할수 있음  
  
**장고 앱 migrate**
* 모델에 대해서 알아보기전에 ```python manage.py runserver``` 실행시 나오는 문구를 자세히 살펴보자
```
You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
```
* 중간쯤에 18개의 적용되지 않은 migration들이 있다는 문구가 보임
* admin, auth, contenttypes, sessions 앱들과 관련된 내용이고 이것을 적용하려면 ```python manage.py migrate```를 실행해야 한다고 나와있음
* admin, auth, contenttypes, sessions 앱들은 장고 프로젝트 생성시 기본적으로 설치 되는 앱들 임
* 설치된 앱들은 ```config/settings.py```에서 확인 가능함
```python
# setting.py
(... 생략 ...)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
(... 생략 ...)
```
* 위에서 언급한 앱들 이외에 messages와 staticfiles 앱들도 추가로 보이지만 이 두개의 앱은 데이터베이스와 상관이 없는 앱 이라서 경고문에 포함되지 않았음
> 데이터베이스에 필요한 앱만 migrate가 필요함
* ```config/settings.py```파일을 보면 설치된 앱 뿐만 아니라 사용하는 데이터베이스에 대한 정보도 아래와 같이 정의되어 있음
```python
# setting.py
(... 생략 ...)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
(... 생략 ...)
```
* 데이터베이스 엔진은 ```django.db.backends.sqlite3```라고 정의되어 있음
* 데이터베이스 파일은 BASE_DIR 디렉터리 밑에 db.sqlite3 파일에 저장한다고 정의되어 있음, BASE_DIR은 프로젝트 디렉터리를 의미함
    * SQLite란
        * SQLite는 주로 개발용이나 소규모 프로젝트에서 사용되는 가벼운 파일 기반의 데이터베이스 임
        * 개발시에는 SQLite를 사용하여 빠르게 개발하고 실제 운영시스템은 좀 더 규모있는 DB를 사용하는 것이 일반적인 개발 패턴임
* 경고 문구에서 안내하는 대로 ```python manage.py migrate```명령을 실행하여 해당 앱들이 필요로 하는 데이터베이스 테이블들을 생성해보자
* 명령 프롬프트에 아래와 같이 입력
```
python manage.py migrate
```
* migrate를 수행하면 admin, auth, contenttypes, sessions 앱들이 사용하는 테이블들이 생성됨 
* 어떤 테이블들이 생성되는지 알 필요는 없음 
* 위의 앱들을 사용하더라도 테이블을 직접 건드릴 일은 없기 때문  
  
**모델 작성**
* 파이보가 사용할 데이터 모델을 만들기
* 파이보는 질문과 답변을 할 수 있는 파이썬 게시판 서비스임
    * 따라서 파이보는 질문과 답변에 해당하는 데이터 모델이 있어야함  
          
**모델의 속성**
* 질문과 답변 모델에 어떤 속성들이 필요할까
* 질문 모델은 최소한 아래와 같은 속성이 필요함
    |속성|설명|
    |:---:|:---|
    |subject|질문의 제목|
    |content|질문의 내용|
    |create_date|질문을 작성한 일시|
* 답변 모델에는 최소한 아래와 같은 속성이 필요함
    |속성|설명|
    |:---:|:---|
    |question|질문(어떠한 질문의 답변인지 알기위함)|
    |content|답변의 내용|
    |create_date|답변을 작성한 일시|  
      
* 생각한 속성을 바탕으로 질문 과 답변에 해당되는 모델을 ```pybo/models.py``` 파일에 정의해 보자
```python
# models.py
from django.db import models

class Question(models.Model):
    subject = models.CharField(max_length=200)
    content = models.TextField()
    create_date = models.DateTimeField()

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.TextField()
    create_date = models.DateTimeField()
```
* Question 모델은 제목(subject), 내용(content) 그리고 작성일시(create_date)를 속성으로 갖도록 작성함
    * 제목은 최대 200자까지 가능하도록 ```max_length=200```을 설정하였음
    * 제목처럼 글자수의 길이가 제한된 텍스트는 CharField를 사용함
    * 내용처럼 글자수를 제한할 수 없는 텍스트는 TextField를 사용함
    * 작성일시처럼 날짜와 시간에 관계된 속성은 DateTimeField를 사용함
* Answer 모델은 질문에 대한 답변에 해당되므로 Question 모델을 속성으로 가져가야 함
    * 기존 모델을 속성으로 연결하려면 ```ForeignKey```를 사용해야함
        * ```ForeignKey```는 다른 모델과 연결하기 위해 사용함
    * ```on_delete=models.CASCADE``` 의 의미는 이 답변과 연결된 질문이 삭제될 경우 답변도 함께 삭제된다는 의미임
        * 질문 하나에는 무수히 많은 답변이 등록될 수 있음 
        * CASCADE 옵션은 질문을 삭제하면 그에 달린 답변들도 모두 함께 삭제함
* 장고에서 사용하는 속성(Field)의 타입은 이것 외에도 많음
* 아래 링크 에서 어떤것들이 있는지 참고 하도록 하자  
> ## [링크](https://docs.djangoproject.com/en/4.0/ref/models/fields/#field-types)  
  
**테이블 생성하기**
* 작성한 모델을 이용하여 테이블을 생성해보자
* 테이블 생성을 위해 가장 먼저 해야할 일은 pybo 앱을 ```config/setting.py```파일의 INSTALLED_APPS 항목에 추가하는 일
```python
# setting.py
(... 생략 ...)
INSTALLED_APPS = [
    'pybo.apps.PyboConfig',
    # 위 문장 추가
    'django.contrib.admin',
    'django.contrib.auth',
    (... 생략 ...)
]
(... 생략 ...)
```
* INSTALLED_APPS에 추가한 ```pybo.apps.PyboConfig``` 클래스는 ```pybo/apps.py``` 파일에 있는 클래스 임
* 이 파일은 pybo 앱 생성시 자동으로 만들어지는 파일로 따로 만들 필요가 없음
* 이미 ```pybo/apps.py```파일 안에 아래와 같은 클래스가 구현되어 있음
```python
# apps.py
from django.apps import AppConfig


class PyboConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pybo'
```
* 특별한 경우가 아니라면 PyboConfig 클래스를 수정할 일은 없음
* pybo 앱을 INSTALLED_APPS 항목에 추가하지 않으면 이어지는 작업을 할 수 없으니 빠뜨리지 않도록 주의  
  
**makeigrations**
* 테이블 생성을 위해 아래처럼 ```migrate```명령을 수행
```
python manage.py migrate
```
* 하지만 위 명령 실행후 결과를 보면 ```migrate```가 정상적으로 수행되지 않음 
* 왜냐면 모델이 신규로 생성되거나 변경되면 ```makemigrations```명령을 먼저 수행한 후에 ```migrate```명령을 수행해야 하기 때문임
* 그러므로 ```python manage.py makemigrations```명령을 수행하자
    * ```makemigrations``` 명령은 모델을 생성하거나 모델에 변화가 있을 경우에 실행해야 하는 명령 임
    * 위 명령을 수행하면 ```pybo\migrations\0001_initial.py``` 라는 파이썬 파일이 자동으로 생성됨
* 한번 더 실행하더라도 변경사항 없음을 보여주므로 여러번 실행시 뭔가 잘못 될까 걱정할 필요는 없음
* ```makemigrations``` 명령을 수행하더라도 실제로 테이블이 생성되지는 않음
* ```makemigrations``` 명령은 장고가 테이블 작업을 수행하기 위한 작업 파일(예: 0001_initial.py)을 생성하는 명령어 임
    * 실제 테이블 작업은 ```migrate``` 명령을 통해서만 가능함  
      
**sqlmigrate**
* makemigrations로 데이터베이스 작업 파일을 생성하고 migrate 명령을 실행하기 전에 실제 어떤 쿼리문이 실행되는지 sqlmigrate 명령으로 확인해 볼수 있음
    * sqlmigrate 명령은 단지 실행되는 쿼리만 조회할 뿐이다. 실제 쿼리가 수행되지는 않음
* ```python manage.py sqlmigrate pybo 0001``` 명령에서 "pybo"는 앱 이름을 의미하고 "0001"은 생성된 작업파일(예: 0001_initial.py)의 일련번호를 의미함  
  
**migrate**
* migrate 명령을 수행하여 실제 테이블을 생성하자
```
python manage.py migrate
```
* 실제 테이블은 pybo_question과 pybo_answer라는 이름으로 생성 됨 
* 장고로 코딩을 할 때는 이런 테이블명을 몰라도 됨
    * 왜냐하면 코딩할 때는 테이블명 대신 Question과 Answer와 같은 모델을 사용하기 때문  
  
**모델 사용하기**
* 모델 사용법을 장고 셸로 익힐건데 장고 셸은 ```python manage.py shell```을 통해 실행 가능
* 일반적인 파이썬 셸을 실행하는 것이 아니라 ```python manage.py shell``` 처럼 장고 셸을 실행해야 함에 주의
* 장고 셸은 장고에 필요한 환경들이 자동으로 설정되어 실행됨
* Question 모델을 이용하여 질문 데이터를 만들어 보자
```
>>> from django.utils import timezone
>>> q = Question(subject='pybo가 무엇인가요?', content='pybo에 대해서 알고 싶습니다.', create_date=timezone.now())
>>> q.save()
```
* Question 모델의 create_date 속성은 DataTimeField 타입이므로 ```timezone.now()```로 현재일시를 대입하였음
* 위처럼 Question 모델의 객체 q를 생성한 후 save함수를 실행하면 질문 데이터가 1건 생성됨
* 데이터가 1건 생성되면 반드시 아래처럼 id 값이 생성됨
```
>>> q.id
1
```
* id는 모델 데이터의 유일한 값으로 프라이머리 키(PK:Primary Key)라고도 함 
    * 이 id 값은 데이터를 생성할 때마다 1씩 증가됨
* 2번째 질문을 아래처럼 만들어보자
```
>>> q = Question(subject='장고 모델 질문입니다.', content='id는 자동으로 생성되나요?', create_date=timezone.now())
>>> q.save()
>>> q.id
2
```
* 두번째로 생성한 질문의 id는 예상대로 2 라는 것을 알수있음  
  
**Question 조회**
* 저장한 데이터를 조회 해보자
```
>>> Question.objects.all()
<QuerySet [<Question: Question object (1)>, <Question: Question object (2)>]>
```
* 저장한 Question 모델의 데이터는 ```Question.objects``` 를 통해서 조회할 수 있음 
* ```Question.objects.all()```은 모든 Question 데이터를 조회하는 함수 
* 결과값으로는 QuerySet 객체가 리턴되는데 위처럼 Question 객체를 포함하고 있음 
* ```Question object (1)```, ```Question object (2)``` 에서 1과 2는 Question 데이터의 id 값 임
* 아래처럼 Question 모델에 ```__str__``` 메서드를 추가하면 id 값 대신 제목을 표시할 수 있음
```python
(... 생략 ...)
# models.py
class Question(models.Model):
    subject = models.CharField(max_length=200)
    content = models.TextField()
    create_date = models.DateTimeField()

    def __str__(self):
        return self.subject

(... 생략 ...)
```
* ```Question.objects.all()``` 함수를 다시 실행 해 보자
    * 모델이 변경되었으므로 장고 셸을 재시작해야 변경된 결과를 확인할 수 있음
        * 장고 셸을 종료하기 위해서는 장고 셸에서 ```Ctrl+Z``` 또는 ```quit()```을 입력하면 됨
```
(mysite) c:\projects\mysite>python manage.py shell
>>> from pybo.models import Question, Answer
>>> Question.objects.all()
<QuerySet [<Question: pybo가 무엇인가요?>, <Question: 장고 모델 질문입니다.>]>
```
* 1과 2라는 id 값 대신 이제 제목이 표시되는 것을 확인할 수 있음
* 모델에 메서드가 추가될 경우에는 makemigrations와 migrate를 수행할 필요가 없음 
* makemigrations, migrate 명령이 필요한 경우는 모델의 속성이 변경되었을때 뿐임
*  filter를 사용하여 id 값이 1인 Quesiton 데이터를 조회해 보자
```
>>> Question.objects.filter(id=1)
<QuerySet [<Question: pybo가 무엇인가요?>]>
```
* filter는 조건에 해당되는 데이터를 모두 리턴해 주기 때문에 다건을 의미하는 QuerySet이 리턴됨
* id는 유일한 값이므로 filter 대신 get을 이용하여 조회할 수도 있음
```
>>> Question.objects.get(id=1)
<Question: pybo가 무엇인가요?>
```
* get으로 조회할 경우 QuerySet이 아닌 Question 모델 객체가 리턴되었음 
    * filter는 다건을 리턴하지만 get은 한건만 리턴하기 때문
* 하지만 get으로 조회시 조건에 맞는 데이터가 없으면 아래와 같은 오류가 발생
```
>>> Question.objects.get(id=3)
Traceback (most recent call last):
  File "<console>", line 1, in <module>
  File "C:\venvs\mysite\lib\site-packages\django\db\models\manager.py", line 85, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
  File "C:\venvs\mysite\lib\site-packages\django\db\models\query.py", line 435, in get
    raise self.model.DoesNotExist(
pybo.models.Question.DoesNotExist: Question matching query does not exist.
```
* get은 반드시 1건의 데이터를 조회할 때 사용함 
* 보통 get은 id와 같은 유일한 값으로 조회할 경우에만 사용함
* subject에 "장고"라는 문자열이 포함된 데이터만 조회하는 방법에 대해서 알아보자
```
>>> Question.objects.filter(subject__contains='장고')
<QuerySet [<Question: 장고 모델 질문입니다.>]>
```
* ```subject__contains='장고'```의 의미는 "subject에 '장고'라는 문자열이 포함되어 있는가?" 라고 해석할 수 있음 
    * ```subject__contains``` 에서 언더바(_)가 1개가 아닌 2개임에 주의
* 데이터를 조회하는 filter의 사용법은 위에서 알아본 것 외에도 아주 많음 
* filter에 대한 자세한 사용법은 장고 공식 문서를 참조하도록 하자 
* 장고 공식 문서는 장고 개발시 필수적으로 참조해야 하는 문서임
> ## [링크](https://docs.djangoproject.com/en/4.0/topics/db/queries/)  
  
**Question 수정**
* 저장한 Question 데이터를 수정해보자
* 먼저 아래와 같이 id 값이 2인 데이터를 조회함
```
>>> q = Question.objects.get(id=2)
>>> q
<Question: 장고 모델 질문입니다.>
```
* 그리고 subject 속성을 다음과 같이 수정
```
>>> q.subject = 'Django Model Question'
```
* 여기까지만 해서는 수정이 되지 않음, 반드시 아래처럼 save를 수행해 주어야 변경된 데이터가 반영된다는 것을 꼭 기억하자
```
>>> q.save()
>>> q
<Question: Django Model Question>
```  
  
**Question 삭제**
* id 값이 1인 Question 데이터를 삭제해 보자
```
>>> q = Question.objects.get(id=1)
>>> q.delete()
(1, {'pybo.Question': 1})
```
* delete를 수행하면 해당 데이터가 삭제됨 
* 삭제될 때는 위와 같이 추가정보가 리턴됨 
    * (1, {'pybo.Question': 1})은 Question 모델이 1개 삭제되었음을 의미함
* 실제로 삭제되었는지 아래처럼 ```Question.objects.all()``` 로 확인해 보자
```
>>> Question.objects.all()
<QuerySet [<Question: Django Model Question>]>
```
* 첫번째 질문은 삭제되고 두번째 질문만 조회되는 것을 확인할 수 있음  
  
**Answer 작성**
* 답변 데이터를 작성 해보자
```
>>> q = Question.objects.get(id=2)
>>> q
<Question: Django Model Question>
>>> from django.utils import timezone
>>> a = Answer(question=q, content='네 자동으로 생성됩니다.', create_date=timezone.now())
>>> a.save()
```
* 답변 데이터를 만들기 위해서는 질문이 필요하므로 id가 2인 질문을 먼저 조회한 후 qeustion 속성에 대입해 주었음
* Answer 모델도 Question모델과 마찬가지로 유일한 값을 의미하는 id가 자동으로 생성됨
```
>>> a.id
1
```  

**Answer 조회**
* 답변을 조회하는 방법은 질문과 마찬가지로 Answer의 id값을 사용하면 됨
```
>>> a = Answer.objects.get(id=1)
>>> a
<Answer: Answer object (1)>
```
* Answer객체인 a를 사용하면 답변에 연결된 질문도 조회할수 있음
```
>>> a.question
<Question: Django Model Question>
```
* Answer모델 객체인 a를 통해서 질문을 찾는것은 Answer 모델에 Questiong 속성이 연결되어 있기 때문에 매우 쉬움
* 질문을 이용하여 답변을 찾는것도 가능함
```
>>> q.answer_set.all()
<QuerySet [<Answer: Answer object (1)>]>
```
* ```q.answer_set```을 사용하면 질문에 연결된 답변을 가져올 수 있음
* Question 모델에는 answer_set 이라는 속성이 없지만 Answer 모델에 Question 모델이 ForignKey로 연결되어 있기 때문에 ```q.answer_set```과 같은 역방향 접근이 가능함
* ```연결모델명_set```은 상식적으로 생각하면 더 쉬움
* 질문 하나에는 여러개의 답변이 가능하므로 ```q.answer_set```이 가능하지만 답변 하나에는 여러개의 질문이 있을수 없으므로 ```a.answer_set```은 불가능함
* 답변 하나에는 질문 하나만 가능하기 때문에 ```a.question```만 가능함
* ```연결모델명_set``` 방법은 자주 사용하기 때문에 꼭 기억하자
---
## **장고 관리자**
**슈퍼유저**
* 장고 관리자를 사용하기 위해서는 장고 관리자 화면에 접속할 수 있는 슈퍼유저를 먼저 생성해야함
* ```python manage.py createsuperuser```명령으로 슈퍼유저를 생성하자
    * 위 명령어 입력시 사용자 이름, 이메일주소, 비밀번호를 입력하도록 나오는데 지금 만드는 파이보 서비스에서는 admin, admin@mysite.com, 내 개인적인 비밀번호를 만들었음
* 슈퍼유저가 생성되었으니 로컬 서버를 구동한 후 ```http://localhost:8000/admin/``` 페이지에 접속해보면 아래 사진과 같은 화면을 볼수 있을것이다
![장고관리자화면](https://wikidocs.net/images/page/70718/O_2-03_1.png)
* 사용자 이름에 "admin" 비밀번호에 자신의 비밀번호를 입력하고 로그인 버튼을 클릭하면 아래와 같은 관리자 화면이 나타남
![장고관리자화면2](https://wikidocs.net/images/page/70718/O_2-03_2.png)  
  
**모델 관리**
* Question 모델을 관리자에 등록하여 보자
* pybo 앱 디렉터리를 보면 admin.py 파일이 있음 이 파일을 아래 코드처럼 수정하자
```python
# admin.py
from django.contrib import admin
from .models import Question

admin.site.register(Question)
```
```admin.site.register```로 Question 모델을 등록했음, 그리고나서 장고 관리자 화면을 갱신해 보면 아래 사진처럼 Question이 추가된것을 확인할수 있음
![장고관리자화면3](https://wikidocs.net/images/page/70718/C_2-03_3.png)
* 이렇게 되면 장고 관리자 화면에서 Question 모델을 관리할 수 있게 됨
* 신규 질문을 생설할 수 있고 조회, 수정, 삭제 도 가능함
* 위 화면에서 Question 모델의 "+ 추가" 링크를 클릭하면 아래 사진처럼 Question을 신규로 생성할 수 있는 화면이 나타남
![장고관리자화면4](https://wikidocs.net/images/page/70718/C_2-03_4.png)
* 입력 항목들에 데이터를 채우고 "저장"버튼을 클릭하자
* 날짜와 시각은 "오늘"과 "현재"를 클릭하면 자동 입력됨
* 다했다면 아래 사진처럼 Question 데이터가 추가됨
![장고관리자화면5](https://wikidocs.net/images/page/70718/O_2-03_5.png)
* Answer모델도 동일한 방법으로 등록하면 Question 모델과 마찬가지로 장고 관리자에서 사용할 수 있음  
  
**모델 검색**
* 관리자 화면에서 제목으로 질문 데이터를 검색해보자
* 아래 코드처럼 ```pybo/admin.py```파일을 수정하자
```python
# admin.py
from django.contrib import admin
from .models import Question

class QuestionAdmin(admin.ModelAdmin):
    search_fields = ['subject']

admin.site.register(Question, QuestionAdmin)
```
* Question 모델에 세부 기능을 추가할 수 있는 QuestionAdmin 클래스를 생성하고 제목 검색을 위해 search_fiels 속성에 'subjcet'를 추가하였음
* 위 코드처럼 수정하였다면 아래 사진처럼 검색기능이 추가된 화면을 볼수 있음
![장고관리자화면6](https://wikidocs.net/images/page/70718/C_2-03_6.png)
* 검색어로 "장고"를 입력하고 "검색"버튼을 클릭해보자
![장고관리자화면7](https://wikidocs.net/images/page/70718/C_2-03_7.png)
* 제목에 "장고"라는 문자열이 있는 Question 데이터가 조회됨
* 장고 관리자에는 이 외에도 무수히 많은 기능들이 있음 자세한 내용은 아래 URL참고  
> ## [링크](https://docs.djangoproject.com/en/4.0/ref/contrib/admin/)
---
## **조회와 템플릿**
* 파이보의 핵심기능이 될 질문 목록과 질문 상세 기능을 구현하자  
**질문목록**
* 아래 페이지 요청시 등록한 질문들을 조회할 수 있도록 구현해 보자
```
httpL//localhost:8000/pybo/
```
* 지금은 위 페이지를 요청하면 "안녕하세요 pybo에 오신것을 환영합니다." 라는 문구가 출력됨
* 질문 목록이 출력되도록 pybo/views.py 파일의 index 함수를 다음과 같이 변경하자
```python
# views.py
# from django.http import HttpResponse
# 위 문장 삭제
from django.shortcuts import render
from .models import Question

def index(request):
    question_list = Question.objects.order_by('-create_date')
    context = {'question_list': question_list}
    return render(request, 'pybo/question_list.html', context)
```
* 질문 목록 데이터는 ```Question.objects.order_by('-create_date')``` 로 얻을수 있음
* order_by는 조회 결과를 정렬하는 함수
    * ```order_by('-create_date')```는 작성일시 역순으로 정렬하라는 의미
        * ```-``` 기호가 붙어 있으면 역방향, 없으면 순방향 정렬을 의미함
* 게시물은 보통 최신순으로 보기 때문에 작성일시의 역순으로 정렬함
* render 함수는 파이썬 데이터를 템플릿에 적용하여 HTML로 반환하는 함수
* 즉, 위에서 사용한 render함수는 질문 목록으로 조회한 question_list 데이터를 ```pybo/question_list.html``` 파일에 적용하여 HTML을 생성한후 리턴함
* 여기서 사용된 ```pybo/question_list.html```과 같은 파일을 템플릿이라고 부름
* 템플릿 파일은 HTML파일과 비슷하지만 파이썬 데이터를 읽어서 사용할수 있는 HTML 파일임  
  
**템플릿 디렉터리**
* render 함수에서 사용한 ```pybo/question_list.html``` 템플릿 파일을 작성해야함
* 템플릿 파일을 작성하기 전엔 템플릿 파일을 저장할 디렉터리를 먼저 만들어야함
* 템플릿을 저장할 디렉터리는 ```config/settings.py``` 파일의 TEMPLATES 항목에 설정해야함
```python
# settings.py
(... 생략 ...)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        # 위 문장 수정
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
(... 생략 ...)
```
* ```DIRS```는 템플릿 디렉터리를 여러개 등록할 수 있도록 리스트로 되어있음
* 파이보는 ```BASE_DIR/'templates'``` 디렉터리 한개만 등록함
* 장고는 DIRS에 설정한 디렉터리 외에도 앱 디렉터리 바로 하위에 있는 templates 디렉터리도 템플릿 디렉터리로 인식함
* 즉, pybo 앱의 경우 템플릿 디렉터리를 생성하면 별다른 설정없이 템플릿 디렉터리로 인식함
* 앱(App) 디렉터리 하위에 템플릿 디렉터리를 두는 방법을 권장하지 않음
    * 왜냐하면 하나의 웹 사이트에서 여러 앱을 사용할 때 여러 앱의 화면을 구성하는 템플릿은 한 디렉터리에 모아 관리하는 편이 여러모로 좋기 때문임
* 따라서 pybo 앱은 템플릿 디렉터리로 ```pybo/templates```이 아닌 ```templates/pybo``` 디렉터리를 사용할 것임
* 공통으로 사용하는 템플릿은 ```templates/``` 위치에 저장할것임
    * 모든 앱이 공통으로 사용할 템플릿 디렉터리 - ```projects/mysite/templates```
    * pybo 앱이 사용할 템플릿 디렉터리 - ```projects/mysite/templates/pybo```
    * common 앱이 사용할 템플릿 디렉터리 - ```projects/mysite/templates/common```
* 템플릿 파일을 만들자
* render 함수에서 사용한 템플릿 파일명은 아래와 같음
```
pybo/question_list.html
```
* 따라서 question_list.html 파일은 ```templates/pybo/question_list.html```에 저장 해야함
* 그리고 ```pybo/question_list.html``` 파일을 아래처럼 작성
```python
# question_list.html
{% if question_list %}
    <ul>
    {% for question in question_list %}
        <li><a href="/pybo/{{ question.id }}/">{{ question.subject }}</a></li>
    {% endfor %}
    </ul>
{% else %}
    <p>질문이 없습니다.</p>
{% endif %}
```
* 템플릿을 보면 ```{%```와 ```%}```로 둘러싸인 문장들을 볼 수 있는데 이러한 것들을 템플릿 태그 라고 함
    |태그|설명|
    |:---|:---|
    |{% if question_list %}|question_list가 있다면|
    |{% for question in question_list %}| %}	question_list를 순회하며 순차적으로 하나씩 question에 대입|
    |{{ question.id }}|for문에 의해 대입된 question 객체의 id 번호를 출력|
    |{{ question.subject }}|for문에 의해 대입된 question 객체의 제목을 출력|
* 템플릿에서 사용한 question_list는 render함수로 전달한 "질문 목록" 데이터 임  
  
**템플릿 태크**
* 장고에서 사용하는 탬플릿 태그는 다음 3가지 유형이 중요함
1. 분기  
    * 분기문 태그의 사용법은 아래와 같음
    ```python
    {% if 조건문1 %}
    <p>조건문1에 해당되는 경우</p>
    {% elif 조건문2 %}
    <p>조건문2에 해당되는 경우</p>
    {% else %}
    <p>조건문1, 2에 모두 해당되지 않는 경우</p>
    {% endif %}
    ```
    * 파이썬의 if문과 비슷함, 다만 항상```{% endif %}```태그로 닫아주어야 한다는점을 잊지말자
2. 반복  
    * 반복문 태그의 사용법은 아래와 같음
    ```python
    {% for item in list %}
    <p>순서: {{ forloop.counter }} </p>
    <p>{{ item }}</p>
    {% endfor %}
    ```
    * 파이썬의 for문과 비슷함, 마지막은 항상 ```{% endfor %}``` 태그로 닫아주어야 함 
    * 템플릿 for문 안에서는 아래과 같은 ```forloop``` 객체를 사용할 수 있음

    |forloop속성|설명|
    |:---|:---|
    |forloop.counter|루프내의 순서로 1부터 표시|
    |forloop.counter0|루프내의 순서로 0부터 표시|
    |forloop.first|루프의 첫번째 순서인 경우 True|
    |forloop.last|루프의 마지막 순서인 경우 True|
3. 객체 출력
    * 객체를 출력하기 위한 태그의 사용법은 아래와 같음
    ```python
    {{ 객체 }}
    ```
    * 객체에 속성이 있는 경우는 파이썬과 동일한 방법으로 도트(```.```) 문자를 이용하여 표시하면 됨
    ```python
    {{ 객체.속성 }}
    ```
* 템플릿에 관한 자세한 내용은 아래 링크
> ## [링크](https://docs.djangoproject.com/en/4.0/topics/templates/)  
  
**테스트**
* 여기 까지 한 후에 ```http://localhost:8000/pybo/``` 서버를 요청하면 아래 화면처럼 보임
![템플릿추가후화면](https://wikidocs.net/images/page/70736/O_2-04_1.png)
* 질문 목록 중 한개를 선택하여 클릭하면 아래와 같은 화면이 나옴
![에러화면](https://wikidocs.net/images/page/70736/O_2-04_2.png)
* 이 오류가 뜨는 이유는 ```http://localhost:8000/pybo/2/```와 같은 페이지에 대한 URL매핑이 아직 없기 때문임  
  
**urls.py**
* 질문 목록 화면에서 링크를 클릭하면 요청한 질문 상세 URL은 아래와 같음
```
http://localhost:8000/pybo/2/
```
* 위 URL의 의도는 아래와 같음
```
id 값이 2인 Question을 상세 조회함
```
* 이 URL이 동작할수 있도록 pybo/urls.py 파일을 아래처럼 수정
```python
# urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('<int:question_id>/', views.detail),
]
```
* ```path('<int:question_id>/', views.detail)``` 라는 URL 매핑을 추가했음
* ```http://localhost:8000/pybo/2/``` 페이지가 요청되면 여기에 등록한 매핑 룰에 의해 ```http://localhost:8000/pybo/<int:question_id>/``` 가 적용되어 question_id 에 2가 저장되고 ```views.detail``` 함수도 실행됨, ```<int:question_id>``` 에서 int는 숫자가 매핑됨을 의미함  
  
**views.py**
* 위 URL 매핑 규칙에 의해 실행되는 ```views.detail``` 함수를 만들어야 함
* 아래 처럼 ```pybo/views.py``` 파일에 detail 함수를 추가하자
```python
# views.py
(... 생략 ...)

def detail(request, question_id):
    question = Question.objects.get(id=question_id)
    context = {'question': question}
    return render(request, 'pybo/question_detail.html', context)
```
* index 함수와 크게 다른건 없음, 다만 detail함수 호출시 전달되는 매개변수가 request 외에 question_id가 추가되었음
* 매개변수 question_id에는 URL매핑시 저장된 question_id가 전달됨 즉, ```http://localhost:8000/pybo/2/``` 페이지가 요청되면 매개변수 question_id에 2가 세팅되어 detatil 함수가 실행됨  
  
**question_detail.html**
* detail 함수에서 사용할 ```pybo/question_detail.html``` 템플릿을 아래처럼 작성
```python
# question_detail.html
<h1>{{ question.subject }}</h1>
<div>
    {{ question.content }}
</div>
```
* ```{{ question.subject }}```과 ```{{ question.content }}```의 question은 detail 함수에서 템플릿에 context 변수로 전달한 Question 모델 객체임
* 다시 ```http://localhost:8000/pybo/2/``` 페이지 요청시 아래 사진같은 화면이 출력됨
![질문상세](https://wikidocs.net/images/page/70736/O_2-04_3.png)  
  
**오류 페이지**
* 예를 들어 id가 30인 페이지 요청시 DoesNotExist 오류가 발생함 
* 이 오류는 전달된 question_id가 30이기 때문에 Question.object.get(id=30)이 호출되어 발생한 오류임
* 이 때 브라우저에 전달되는 오류코드는 500임
* 없는 데이터를 요청할 경우 500 오류 페이지 보다는 "Not Found (404)" 페이지를 리턴하는 것이 바람직 함
* 아래 표는 ```HTTP 주요 응답코드의 종류``` 임
    |오류코드|설명|
    |:---|:---|
    |200|성공 (OK)|
    |500|서버오류 (Internal Server Error)|
    |404|서버가 요청한 페이지(Resource)를 찾을 수 없음 (Not Found)|
* ```http://localhost:8000/pybo/30/``` 처럼 없는 데이터를 요청할 경우 500 페이지 대신 404 페이지를 출력하도록 detail 함수를 수정하자
```python
# views.py
from django.shortcuts import render, get_object_or_404
from .models import Question

(... 생략 ...)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    context = {'question': question}
    return render(request, 'pybo/question_detail.html', context)
```
* ```Question.objects.get(id=question_id)```를 ```get_object_or_404(Question, pk=question_id)```로 바꾸었음
* 여기서 사용한 pk는 Question 모델의 기본키(Primary Key)에 해당하는 값을 의미함