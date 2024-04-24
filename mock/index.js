import Mock from 'mockjs'
Mock.mock('http://localhost:8080/hot/tabs',{
	"data": {
	    "list": [
	      {
	        "id": "0",
	        "label": "热榜"
	      },
	      {
	        "id": "1",
	        "label": "前端"
	      },
	      {
	        "id": "2",
	        "label": "JAVA"
	      },
	      {
	        "id": "3",
	        "label": "PHP"
	      },
	      {
	        "id": "4",
	        "label": "Python"
	      },
	      {
	        "id": "5",
	        "label": "C / C++"
	      },
	      {
	        "id": "6",
	        "label": "数据库"
	      }
	    ]
	  },
	  "meta": {
	    "msg": "success",
	    "status": 200
	  }
})