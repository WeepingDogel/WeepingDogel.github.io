# OpenStack 命令笔记




列出所有虚拟机实例。
```
openstack server list
```
列出所有可用的云主机类型。
```
openstack flavor list
```
列出所有可用的镜像。
```
openstack image list
```
列出所有可用的网络。
```
openstack network list
```
列出所有可用的卷。
```
openstack volume list
```
列出所有安全组。
```
openstack security group list
```
列出所有密钥对。
```
openstack keypair list
```


列出所有可用的卷。
```
openstack volume list
```
创建一个新的卷。
```
openstack volume create
```

    openstack volume delete：删除一个卷。
    openstack server add volume：将一个卷附加到一个虚拟机实例。
    openstack server remove volume：从一个虚拟机实例上分离一个卷。
    openstack security group create：创建一个新的安全组。
    openstack security group rule create：创建一个安全组规则。
    openstack security group rule delete：删除一个安全组规则。

