#selectCard.js

**一款可以再次定制的select组件，支持本地和远程数据的加载，解决数据量庞大的查询问题** 

##使用方法：

###1.引入jQuery selectCard.js 以及所需的css文件

代码如下:

	<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="selectCard.js"></script>
	<link rel="stylesheet" href="styles/style.css" type="text/css"/>
	
###2.在特定的地方加入所需标记

代码如下：

	<body>
	<span id="combox"></span>
	</body>	

###3.给插件指定属性

本地数据：

	<script type="text/javascript">
		$(document).ready(function() {
			$('#combox').selectCard(
				{
					datas:[{id:'选项一'},{id:'选项二'},{id:'选项三'}],
				}
				);
		})
	</script>
	
远程动态数据：(根据用户输入的key值前往远程数据库查询，并返回匹配类似数据)

	<script type="text/javascript">
	$(document).ready(function() {
		$('#combox').selectCard(
			{
				ajax:{
					url:"http://ljwtest.sinaapp.com/testJson.php",
					dataType:"json",
					type:"POST",
					data:""
				}
			}
			);
	})
	</script>
