# 镜像命令 

```
`Docker  imgaes 查看本地的主机上的镜像
Docker images -a  显示所有镜像 
Docker images -q  列出镜像的id`
```

```
Docker search mysql  去docker 仓库 去搜索mysql

Docker  pull mysql : version 下载mysql  后面可以指定版本

Docker rmi  -f  镜像名称 | 镜像 id 
```
##     删除 镜像  

`Docker  rmi -f $(docker images -aq )`

`容器命令
有了镜像 才可以创建容器
容器启动 
docker  run [可选参数]  image (镜像名称)`

>#参数说明
>—name = ’Name’  容器名字 
>-d   后台运行
>-it   使用交互方方式运行
>-p    指定容器端口 
>       -p 8080   容器端口 
>       -p 【可以加ip地址】8080:8080  主机端口 ： 容器端口

## 退出容器   
`退出容器 停止运行  exit 
退出容器  但是不停止运行  crtl + p +q`

## 列出所有运行中容器 
`Docker  ps 
Docker  ps -a  当前运行+历史运行的容器 
Docker ps -q 只显示容器的编号 
Docker  ps -aq 显示所有容器的编号`


## 删除容器
`Docker   rm 容器id 
Docker  rm -f $(docker ps -aq)  删除所有的容器  
`
## 启动和停止容器
`Docker  stop 容器id    停止容器
Docker  start  容器 id    启动容器
Docker   restart  容器id   重启容器
Docker  kill 容器 id    强制停止运行中的容器
`
## 查看日志 
`Docker  logs -tf   —tail 10 容器id  

查看容器中的进程  
 Top  命令

Docker top 容器id 容器内部的进程信息   

查看镜像的元数据  
Docker  inspect  容器的id

进入当前正在运行的容器
Docker exec -it  容器 id  进入容器开启一个新的终端 （常用）
Docker  attach 容器id    进入容器正在执行的终端 

从容器内拷贝文件到主机上 
Docker  cp  容器id: 文件路径   本机路`