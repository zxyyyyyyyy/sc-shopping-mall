一、组件通信方式：已经学过6种
1.props:适用于父子组件通信。

注意事项：
-如果父组件给子组件传递数据（函数）:本质其实是子组件给父组件传递数据
-如果父组件给子组件传递数据（非函数）：本质就是父组件给子组件传递数据

vue当中props书写方式：3种
子组件接收： ['todos']  {type:Array}   {type:Array,default:[]}

小提示：路由的props
书写形式：3种  布尔值，对象，函数形式

2.自定义事件：子组件给父组件传递数据
$on 与 $emit

3.全局事件总线：$bus
适用于场景：万能（父子，子父，兄弟...）
vue.prototype.$bus = this;

4.pubsub-js:在react框架中使用比较多（发布于订阅）
适用于场景：万能

5.Vuex
适用于场景：万能

6.插槽
适用于场景：父子组件通信----（一般结构）
三种：默认插槽，具名插槽，作用域插槽


二、事件的注意事项：
事件：
系统事件：click、双击、鼠标系列事件
自定义事件

事件源、事件类型、事件回调

1）原生DOM---button可以绑定系统事件---click单击事件等等
2）组件标签---event1可以绑定系统事件（不起作用：因为属于自定义事件）---click.native(可以把自定义事件变成原生的DOM事件)
.native原理：当前原生DOM click事件，其实是给子组件的根节点绑定了点击事件---利用了事件委派

原生DOM绑定自定义事件@xxx没有任何意义，因为没有触发$emit函数
自定义组件绑定自定义事件：在自定义组件中用$emit接收触发

三、v-model[组件通信方式一种]
v-model它是vue框架中的指令，它主要结合表单元素一起使用（文本框、复选、单选...）,它主要作用是收集表单数据

原生DOM当中有oninput（@input="msg=$event.target.value"）事件，它经常结合表单元素一起使用，当表单元素文本内容发生变化的时候就会触发一次回调
vue2:可以通过value与input事件实现v-model功能

<!-- 深入学习v-model：实现父子组件数据同步（实现父子组件通信） -->
<!-- 父组件中： -->
<子组件 :value="msg" @input="mag = $event" />

-在父组件里子组件标签上面的:value到底是什么？---是props,父子组件通信
-@input到底是什么？---并非原生DOM的input事件，属于自定义事件

<!-- 子组件中： -->
<input type:"text" :value="value" @input="$emit('input',$event.target.value)">
- :value为动态属性
- @input：给原生DOM绑定的原生DOM事件

简化v-model：
<!-- 父组件中： -->
<子组件v-model="msg" />

v-model实现的原理：value与input事件实现的，而且还需要注意可以通过v-model实现父子组件数据同步。

四、属性修饰符 sync ：[组件通信方式的一种] 可实现父子组件数据同步
:money.sync，代表父组件给子组件传递props【money】，给当前子组件绑定一个自定义事件（update：money）

不适用sync修饰符：
<Child :money="money" @update:money = "money = $event"/>
<!-- ：money  父组件给子组件传递props
@update:money 给子组件绑定的自定义事件，只不过名字叫做update:money
目前这种操作，其实和v-model很相似，可以实现父子组件数据同步 -->
<button @click="$emit('update:money',money-100)">花钱</button>

使用sync修饰符：
<Child :money.sync="money" />
<!-- :money.sync:第一，父组件给子组件传递props money 
第二，给当前子组件绑定了一个自定义事件，而且事件名称即为update:money -->
<button @click="$emit('update:money',money-100)">花钱</button>

五、$attrs 和 $listeners: [组件通信方式的一种] 
  获取父组件传递过来的props属性和自定义事件

1)$attrs:属于组件的一个属性，可以获取到父组件传递过来的props数据
对于子组件而言，父组件给的数据可以利用props接收，但是需要注意，如果子组件通过props接收的属性，在$attrs属性当中获取不到
<!-- 子组件中标签内 -->
v-bind="$attrs"  v-bind不能用 : 进行替换

2)$listeners,它是组件实例自身的一个属性，它可以获取到父组件给子组件传递的自定义事件
<!-- 子组件中标签内 -->
v-on:"$listeners"  v-on不能用 @ 进行替换

六、$children与$parent [组件通信方式：可实现父子、子父传递数据]

1)$children组件实例的一个属性，可以获取到当前组件的全部子组件[返回的是数组]
而ref只能获取到相应的那一个子组件

2）$parent组件实例的一个属性，可以获取到当前子组件的父组件，进而可以操作父组件的数据和方法

七、混入mixin 
如果项目当中出现很多结构类似的功能，想到组件复用。
如果项目当中很多的组件JS业务逻辑相似，想到mixin。[可以把多个组件JS部分重复、相似的地方]

八、插槽
插槽：可以实现父子组件通信（通信的是结构）
-默认插槽
-具名插槽
-作用域插槽：子组件的数据来源于父组件，子组件是决定不了自身结构与外观。<slot ></slot>