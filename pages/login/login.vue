<template>
	<view class="container">
		<view class="loginImg FX-c por">
			<view class="logo FX-c FY-fe poa">
				<image class="img" src="../../static/img/logo.png" mode=""></image>
			</view>
		</view>
		<tui-tabs :tabs="navbar" :currentTab="currentTab>1?0:currentTab" @change="change" itemWidth="50%"></tui-tabs>
		<view class="tui-form" v-if="currentTab==0">
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#9E2036" :size="20"></tui-icon>
					
						<input
							:adjust-position="false"
							v-model="mobile"
							placeholder="请输入手机号"
							:mobile="true"
							placeholder-class="tui-phcolor"
							type="number"
							maxlength="11"
							@blur="inputMobile"
						/>
						<view class="tui-icon-close" v-show="mobile" @tap="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#9E2036" :size="20"></tui-icon>
						<input
							:adjust-position="false"
							v-model="password"
							placeholder="请输入密码"
							:password="true"
							placeholder-class="tui-phcolor"
							type="text"
							maxlength="36"
							@blur="inputPwd"
						/>
						<view class="tui-icon-close" v-show="password" @tap="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
			</view>
			<!-- <view class="tui-cell-text">
				<view class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @tap="href(1)">忘记密码？</view>
				<view hover-class="tui-opcity" :hover-stay-time="150">
					没有账号？
					<text class="tui-color-primary" @tap="href(2)">注册</text>
				</view>
			</view> -->
			<view class="tui-btn-box"><tui-button style="margin-top: 50rpx;" type="bronze" :disabledGray="true" :disabled="disabled" shape="circle" @click="onlogin">登录</tui-button></view>
		</view>
		
		<view class="tui-form" v-if="currentTab==1">
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#9E2036" :size="20"></tui-icon>
						<input v-model="mobiles" placeholder="请输入手机号" :disabled="butbool==true" :mobiles="true" placeholder-class="tui-phcolor" type="number" maxlength="11" @input="inputMobiles" />
						<view class="tui-icon-close" v-show="mobiles" @tap="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="shield" color="#9E2036" :size="20"></tui-icon>
						<input v-model="code" placeholder="请输入验证码" placeholder-class="tui-phcolor" type="text" maxlength="6" @blur="inputCodes" />
						
						<!-- <button v-if="butbool==true" type="primary">{{word}}</button> -->
						<view :class="cls ? 'example-body FY-c sub':'example-body FY-c subs'">
							<uni-countdown style="margin: 0;" v-show="butbool==true" color="#fff" backgroundColor="#ccc" :second="testSecond"/>
							<text class="subtxt" @tap="messages">{{btnSendText}}</text>
						</view>
						
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="FX">
						<view class="tui-cell-input">
							<tui-icon name="pwd" color="#9E2036" :size="20"></tui-icon>
							<input v-model="passwords" placeholder="请输入密码" :passwords="true" placeholder-class="tui-phcolor" type="password" maxlength="40" @blur="inputPwds" />
							<view class="tui-icon-close" v-show="passwords" @tap="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
						</view>
						<view class="tui-cell-input">
							<tui-icon name="pwd" color="#9E2036" :size="20"></tui-icon>
							<input v-model="passwordss" placeholder="请确认密码" :passwordss="true" placeholder-class="tui-phcolor" type="password" maxlength="40" @blur="inputPwdss" />
							<view class="tui-icon-close" v-show="passwordss"><tui-icon :size="16" color="#bfbfbf"></tui-icon></view>
						</view>
					</view>
				</tui-list-cell>
			</view>
			
			<view class="tui-cell-text FY FY-fs">
				<view class="FX FY-c">
					<checkbox-group name="ai">
						<label>
							<checkbox :checked="check" @click="checked"/>
						</label>
					</checkbox-group>
					注册代表同意
				</view>
				<view class="">确认阅读并理解
					<view style="display: inline;" class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @tap="protocol">
						<text @tap="showModal1">《用户服务协议》、</text>
						<text @tap="showModal2">《隐私政策》、</text>
						<text @tap="showModal3">《现货交易管理办法》</text>
					</view>
				的内容，自愿申请成为商城会员
				</view>
			</view>
			
			<view class="tui-btn-box"><tui-button type="bronze" :disabledGray="true" :disabled="disableds" shape="circle" @click="onregister">注册</tui-button></view>
		</view>
			
			<!--底部抽屉-->
			<tui-bottom-popup :show="bottomPopup" @close="hideModal">
				<view class="region-box">
					<view
						class="region-txt"
						:class="[index == regionArr.length - 3 || index == regionArr.length - 2 || index == regionArr.length - 1 ? 'grow' : '']"
						v-for="(item, index) in regionArr"
						:key="index"
						:data-index="index"
					>
						<!-- <image class="img1" v-if="tap1==true" src="../../static/img/login1.png" mode=""></image>
						<image class="img2" v-if="tap2==true" src="../../static/img/login2.jpg" mode=""></image> -->
						<!-- <image v-if="tap3==true" src="../../static/img/login3.jpg" mode=""></image> -->
					<!-- 	<text class="w40" v-if="tap1==true">{{ item.title }}</text>
						<text class="w40" v-if="tap2==true">{{ item.text }}</text>
						<text class="w40" v-if="tap3==true">{{ item.txt }}</text> -->
						
						<view class="user_service" v-if="tap1==true">
													<view class="user_service_title">风险告知书</view>
													<scroll-view scroll-y class="scroll_text">
														<view class="user_service_subtitle">尊敬的经营商：</view>
														<view class="user_service_text">
															您好！请您务必仔细阅读本《风险告知书》的所有内容，您需要完全理解此《风险告知书》后，方可在本中心办理开户手续和进行交易。鉴于商品购销是有风险的，您的投资可能会有损失，甚至可能超过初始投资额。因此，请您慎重考虑自身财务状况和风险承受能力是否适合进行此类交易，并确定可以自行承担全部风险及亏损。您同时需要客观理性地认识到商品购销的风险包括但不限于：</br></br>一、本平台为现货买卖平台，经营商随时可进行提货，买卖双方在参与商品买卖的过程中，一经采购和销售，即视同于对商品本身价值认可而进行的自愿商品买卖行为。参与商品采购销售后，若因市场变化或各种因素导致商品出现无法采购、销售时，采购者必须对采购商品进行提货，不予退货。</br></br>二、由于国家法律法规及政策的变化、商品市场供求关系的变化、交易中心相关规则的修改、紧急措施的出台等原因，您持有的商品可能无法继续持有，您将承担由此导致的损失。</br></br>三、在不符合经营条件或经营规则规定的特殊情形下，您可能无法买入或卖出商品。出现这类情况，您的经营资金有可能无法弥补全部损失，您将承担由此导致的全部损失。</br></br>四、由于地震、台风、水灾、火灾、战争等不可抗力因素以及交易中心无法控制和不可预测的系统故障、设备故障、通信故障、电力故障、网络故障等其它因素均可能导致交易系统出现延迟、中断、数据错误等非正常运行甚至瘫痪，这些风险可能导致您的交易出现延迟、中断甚至无法全部成交，您将承担由此导致的损失。 </br></br>五、本中心不会在挂牌系统外收取客户任何产品费用，凡在挂牌系统外形成的交易收取的费用或相关承诺，由客户自行承担所需面对的后果及其相应法律责任，本中心一概不予认可。 </br></br>六、本中心禁止客户委托他人代为操作，因客户个人行为泄露账户及密码或委托他人操作带来的所有风险均由账户持有人自行承担责任。</br></br>七、本中心的交易平台属现货买卖平台，不承担由客户个人投资行为带来的一切责任。 本《风险告知书》无法揭示从事商品购销的所有风险和有关本中心现货购销商城平台的全部无法控制和不可预测的情形。请您在入市经营之前，对自身的经济承受能力、风险控制能力、身体及心理承受能力作出客观评估。</br></br>广州大健康现货科技有限公司对此《风险告知书》负责解释和修改。 
														</view>
														<view class="user_service_subtitle">
															经营商须知:
														</view>
														<view class="user_service_text">
															一、经营商的开户条件。</br></br>经营商应是具有法人资格或合法成立、有一定的组织机构和财产、但又不具备法人资格的组织，且能独立从事商品经营活动；自然人经营商须是年满十八周岁、具有完全民事行为能力且具有一定的经济承受能力、风险控制能力和经营商品相关知识的公民。经营商须以真实、有效的身份开户。经营商须保证资金来源的合法性及所提供资料的真实性、合法性、有效性。</br></br>二、经营商须知。</br></br>（一）知晓商品经营风险。经营商应知晓从事商品经营具有风险，应仔细阅读并理解《风险告知书》。</br></br>（二）本中心的合作单位不得接受经营商的全权委托。经营商应知晓本中心合作单位及其工作人员不得接受经营商的全权委托，经营商也不得要求本中心合作单位或其工作人员以全权委托的方式进行商品经营。</br></br>（三）知晓本中心合作单位公示网址。有关本中心合作单位的信息可以通过公示信息进行查询和核实。</br></br>（四）知晓本中心合作单位的有关规定。经营商应知晓只有得到本中心授权、取得相应资格的合作单位及其分支单位才能办理和协助本中心从事相关业务。 
														</view>
														<view class="user_service_subtitle">
															入市协议
														</view>
														<view class="user_service_text">
															甲方：广州大健康现货科技有限公司 </br></br>乙方：      （客户代码：    ） </br></br>依据《中华人民共和国合同法》和相关法律、法规，乙方自愿在甲方平台进行商品经营，接受甲方及其代理人就相关商品经营提供的服务，并自觉遵守和履行甲方有关商品经营的各项制度，为此乙方同意按照本协议条款内容与甲方缔结协议并遵照执行。 </br></br>第一条：乙方确认在同意本协议全部条款内容前已选定甲方的某一特定合作单位作为乙方商品经营的服务主体。乙方选定的合作单位的主要职责是为乙方提供培训以及咨询信息等服务，协助甲方进行风险控制。</br></br>第二条：乙方确认其在签署本协议前，已仔细阅读、理解并认可了《风险告知书》、《经营商须知》（该两份文件作为本协议的附件，系本协议不可分割之组成部分）及本协议条款内容。 </br></br>第三条：甲、乙双方一致确认并同意，广州大健康现货科技有限公司的相关制度中有关条款赋予甲方的权利是为确保经营正常进行和控制风险所必须的条件。 乙方自愿接受甲方的管理和监督检查。乙方承诺：如乙方在经营中出现违反相关规则规定的情形，乙方同意甲方根据相关制度进行处理，并自愿承担因此产生的损失。 </br></br>第四条：乙方承诺，其有足够充分的能力，全面、及时、适当地履行商品经营义务。 </br></br>第五条：乙方自愿采用甲方提供的电子经营平台进行商品经营，甲方为乙方提供经营系统、经营商位及其它有关商品经营、交收的设施和服务，并为乙方办理结算。 </br></br>第六条：乙方应按照甲方相关规定申请经营代码，设置、保存和修改经营密码。甲方禁止乙方委托他人代为操作，因乙方个人行为泄露账户及密码或委托他人操作带来的所有风险均由乙方自行承担责任。 </br></br>第七条：甲方交易平台为现货商品买卖平台，乙方在参与商品买卖的过程中，随时可以进行提货，商品采购和销售一经达成，即视同于乙方对商品本身价值认可而进行的自愿商品买卖行为。乙方参与商品采购销售后，若因市场变化或各种因素导致商品出现无法采购、销售时，乙方必须对采购商品进行提货，不予退货。乙方对此不持异议。 </br></br>第八条：甲方有权根据实际情况对相关制度进行修订，乙方对此予以认可，并承诺遵照修订后的制度执行。乙方应严格按照相关制度履行义务，包括但不限于经营资金、货款、手续费及其它费用的支付、结算和货物交收等。 </br></br>第九条：本协议履行过程中，如果相关法律、法规、规章、政策及甲方相关制度发生变化，该等变化与本协议条款不一致的，甲、乙双方自动按照变化后的内容执行，变化内容视为对本协议条款的变更或补充。 相关法律法规、规章和政策变化导致的本协议变更，自法律法规、规章和政策生效实施日起本协议相应变更生效；甲方相关规则变化导致的本协议变更或补充，一经发出，则该等变更或补充于发出之时即行生效。 </br></br>第十条：因甲方不可预测、无法控制和不可避免的系统故障、设备故障、通讯故障、电力故障等突发事故给乙方造成的损失，甲方不承担责任。因上述事故造成经营或经营数据中断，恢复经营时以故障发生前系统最终记录的经营数据为有效数据。</br></br>第十一条：甲方或合作单位向乙方提供的各种信息及资料仅作为经营参考，乙方据此进行经营的，风险自担。 </br></br>第十二条：乙方同意按照甲方的有关规定向甲方支付经营费用。合作单位的服务费由甲方代为收取。经营费用和服务费由甲方在乙方账户及时直接扣取。甲方不会在商城系统外收取乙方任何产品费用，凡在商城系统外形成的交易收取的费用或相关承诺，由乙方自行承担所需面对的后果及其相应法律责任，甲方一概不予认可。 </br></br>第十三条：乙方确保已学习商品经营知识并了解经营中可能存在的风险，并有能力承担风险；乙方保证资金来源的合法性和所提供资料的完整性、真实性、有效性和合法性。甲方不承担由乙方个人投资行为带来的一切责任。</br></br>第十四条：乙方不继续参加经营，应直接或通过合作单位向甲方提出申请，在办理相关手续、结清款项和相关费用后本协议终止。 </br></br>第十五条：因本协议引起的一切争议，由甲、乙双方协商解决，如协商不成的，同意将争议向甲方所在地有管辖权的人民法院提请诉讼。 </br></br>第十六条：本协议在甲方通过乙方的开户申请，并将开户成功通知送达（含系统通知、短信通知、邮件通知等）乙方起生效。</br></br>第十七条：本协议未尽事宜，甲方、乙方一致同意按照甲方相关规定执行。甲方相关规定是本协议不可分割的组成部分，两者具有同等法律效力。</br></br>第十八条：本协议生效后，乙方可以打印纸质文本留存。
														</view>
													</scroll-view>
												</view>
												<view class="privacy" v-if="tap2==true">
													<view class="privacy_title">隐私政策</view>
													<scroll-view scroll-y class="scroll_text">
														<view class="privacy_text">
															1.特别提示
														</br></br>1.1.本公司同意按照本协议的规定及其不时发布的操作规则提供基于互联网的相关服务（以下称"网络服务"）。为获得网络服务，服务使用人（以下称"用户"）应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。
						用户在进行注册程序过程中选择"我同意本公司服务协议"选项，即表示用户完全接受本协议项下的全部条款。</br></br>2.服务内容</br></br>2.1本公司会员专区网络服务的具体内容由本公司根据实际情况提供，例如论坛
						(BBS)、招商信息、资料库、发表新闻评论等。本公司保留随时变更、中断或终止部分或全部网络服务的权利。</br></br>2.2用户理解，本公司仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如电脑、调制解调器及其他与接入互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均应由用户自行负担。</br></br>3.使用规则</br></br>3.1用户在申请使用本公司网络服务时，必须向本公司提供准确的个人资料，如个人资料有任何变动，必须及时更新。</br></br>3.2用户注册成功后，本公司将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</br></br>3.3用户必须同意接受本公司通过电子邮件或其他方式向用户发送的优惠服务信息或其他相关服务信息。</br></br>3.4用户在使用本公司网络服务过程中，必须遵循以下原则：</br></br>(1)在本公司的网页上发布信息或者利用本公司的服务时必须符合中国有关法规
						(部分法规请见附录)，不得在本公司的网页上或者利用本公司的服务制作、复制、发布、传播以下信息：</br></br>(a)反对宪法所确定的基本原则的；</br></br>(b)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</br></br>(c)损害国家荣誉和利益的；</br></br>(d)煽动民族仇恨、民族歧视，破坏民族团结的；</br></br>(e)破坏国家宗教政策，宣扬邪教和封建迷信的；</br></br>(f)散布谣言，扰乱社会秩序，破坏社会稳定的；</br></br>(g)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</br></br>(h)侮辱或者诽谤他人，侵害他人合法权益的；</br></br>(i)含有法律、行政法规禁止的其他内容的。</br></br>(2)在本公司的网页上发布信息或者利用本公司的服务时还必须符合其他有关国家和地区的法律规定以及国际法的有关规定。</br></br>(3)不利用本公司的服务从事以下活动：</br></br>(a)未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</br></br>(b)未经允许，对计算机信息网络功能进行删除、修改或者增加的；</br></br>(c)未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</br></br>(d)故意制作、传播计算机病毒等破坏性程序的；</br></br>(e)其他危害计算机信息网络安全的行为。</br></br>(4)不以任何方式干扰本公司的服务。</br></br>(5)遵守本公司的所有其他规定和程序。</br></br>4.内容所有权</br></br>4.1本公司提供的网络服务内容可能包括：文字、软件、声音、图片、录像、图表等。所有这些内容受版权、商标和其它财产所有权法律的保护。</br></br>4.2用户只有在获得本公司或其他相关权利人的授权之后才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。</br></br>5.隐私保护</br></br>5.1保护用户隐私是本公司的一项基本政策，本公司保证不对外公开或向第三方提供用户注册资料及用户在使用网络服务时存储在本公司的非公开内容，但下列情况除外：</br></br>(a)事先获得用户的明确授权；</br></br>(b)根据有关的法律法规要求；</br></br>(c)按照相关政府主管部门的要求；</br></br>(d)为维护社会公众的利益；</br></br>(e)为维护本公司的合法权益。</br></br>5.2本公司可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本公司同等的保护用户隐私的责任，则本公司可将用户的注册资料等提供给该第三方。</br></br>5.3在不透露单个用户隐私资料的前提下，本公司有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</br></br>6.免责声明</br></br>6.1若本公司已经明示其网络服务提供方式发生变更并提醒用户应当注意事项，用户未按要求操作所产生的一切后果由用户自行承担。</br></br>6.2用户明确同意其使用本公司网络服务所存在的风险将完全由其自己承担；因其使用本公司网络服务而产生的一切后果也由其自己承担，本公司对用户不承担任何责任。</br></br>6.3本公司不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</br></br>7.服务变更、中断或终止</br></br>7.1如因系统维护或升级的需要而需暂停网络服务，本公司将尽可能事先进行通告。</br></br>7.2如发生下列任何一种情形，本公司有权随时中断或终止向用户提供本协议项下的网络服务而无需通知用户：</br></br>(a)用户提供的个人资料不真实；</br></br>(b)用户违反本协议中规定的使用规则。</br></br>7.3除前款所述情形外，本公司同时保留在不事先通知用户的情况下随时中断或终止部分或全部网络服务的权利，对于所有服务的中断或终止而造成的任何损失，本公司无需对用户或任何第三方承担任何责任。</br></br>8.违约赔偿</br></br>8.1用户同意保障和维护本公司及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给本公司或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。</br></br>9.修改协议</br></br>9.1本公司将可能不时的修改本协议的有关条款，一旦条款内容发生变动，本公司将会在相关的页面提示修改内容。</br></br>9.2如果不同意本公司对服务条款所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为用户接受服务条款的变动。</br></br>10.法律管辖</br></br>10.1本协议的订立、执行和解释及争议的解决均应适用中国法律。</br></br>10.2如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向本公司所在地的人民法院提起诉讼。</br></br>11.通知和送达</br></br>11.1本协议项下所有的通知均可通过重要页面公告、电子邮件或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</br></br>12.其他规定</br></br>12.1本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</br></br>12.2如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，
						本协议的其余条款仍应有效并且有约束力。</br></br>12.3本协议中的标题仅为方便而设，在解释本协议时应被忽略。</br></br>13青少年用户特别提示青少年用户必须遵守全国青少年网络文明公约：要善于网上学习，不浏览不良信息；要诚实友好交流，不侮辱欺诈他人；要增强自护意识，不随意约会网友；要维护网络安全，不破坏网络秩序；要有益身心健康，不沉溺虚拟时空。您只有无条件接受以上所有服务条款，才能继续申请。
														</view>
													</scroll-view>
												</view>
												<view class="management" v-if="tap3==true">
													<view class="management_title">现货挂牌交易管理办法</view>
													<scroll-view scroll-y class="scroll_text">
														<view class="management_text">
															第一条  本规则适用于规范本交易平台（以下简称“交易所”）的现货挂牌交易行为，交易场所是交易所提供的现货挂牌交易系统。</br></br>第二条  交易资格的取得：交易所交易商均可参与现货挂牌交易。</br></br>第三条  交易商品由交易所公布，交易商购进和售出商品时可从交易所挂牌的交易商品中进行选择，也可以根据自己的要求向交易所申报新的交易品种。</br></br>第四条  交易商在选择挂牌的交易商品后，应如实申报交易商品的主要商品属性，包括商品品种、等级、主要质量指标、厂家或产地、交货地、交货方式、最少交易量等内容。</br></br>第五条  交货时间：买卖双方一旦成交即进入交货环节。</br></br>第六条  现货挂牌交易的交易时间为每周一至周五（国家法定节假日除外）09：00---11：30时,12：30---15：30时，交易所认为必要时，可以调整交易时间或暂停交易。</br></br>第七条  交易双方通过交易所现货挂牌交易系统达成交易后，应向交易所一次性支付交易手续费；交易手续费标准为0.05%。交易所可以根据实际情况调整交易手续费标准。（收取双方手续费）</br></br>第八条  交易双方达成交易后，由交易所为交易双方提供结算和交收服务并收取商品成交金额0.05%的交收服务费，在交易双方达成一致的情况下，也可由交易双方自行办理结算和交收，交易所免收双方的结算和交收服务费。</br></br>第九条  交易双方通过现货挂牌交易系统交易并签订的交易合同不得转让；交易双方应按照交易合同的约定履行义务。</br></br>第十条  现货挂牌交易系统交易合同的交货时间按买卖双方的约定执行。</br></br>第十一条  交易所现货挂牌交易系统交易报价是指各交易品种在交收时间按照约定的交收地点、交收方式进行交收的含税价格，报价货币为人民币，报价单位为元/吨，交易单位为吨。</br></br>第十二条  交易双方通过现货挂牌交易系统进行交易应向交易所交付定金，定金标准为成交总金额的20%；交易所有权根据商品价格变动和实际情况调整定金比率。</br></br>要交易所提供结算和交收服务的，买方在合同成交后的5日内，应将足额货款划入交易所清算账户；卖方在合同成交后的5日内准备好相应的货物待交货。</br></br>第十三条  交易双方任何一方不履行合同的，违约方无权要求退还已划至交易所帐户的定金，该定金由交易所支付给守约方。</br></br>卖方未按期交付货物或买方未按期付款的，每逾期一天，违约方应向守约方支付迟延履行部分货款金额0.1％的违约金。逾期超过30天的，未履行部分的合同不再履行，交易所将违约方定金支付给守约方。</br></br>第十四条 现货挂牌交易系统交易的程序：</br></br>1、交易商承诺并签署与交易有关的责任文件（含数据电文合同），并向交易所交付足额定金；</br></br>2、挂牌方应根据其选择的交易品种，并根据现货挂牌交易系统的要求，如实申报交易合同的主要条款，包括买卖方向、品名、规格、厂家或产地、数量、质量标准、价格、交货地、最少交易量、该挂牌的有效期等内容；</br></br>3、摘牌方通过现货挂牌交易系统选择所需货物，在确定认可挂牌方的价格等所有成交条件，输入相应数量的摘牌指令即成交，成交价格为挂牌价格；</br></br>4、摘牌方可就挂牌方的价格提出还价，所有的还价信息会通过系统公开。挂牌方在同意退让价格后，参考还价信息中的价格和数量等因素，可以选择相应的还价方进行成交，成交价格为该还价信息的价格，成交数量为交易双方申报数量较少的数量；</br></br>5、买卖指令经交易所现货挂牌交易系统成交，买卖双方即达成现货挂牌交易系统商品现货交易合同，该合同对交易双方均有法律约束力；</br></br>6、未成交的交易指令，有效期后自动失效；</br></br>第十五条  交易所现货挂牌交易系统结算是指根据交易结果和交易所相关规定对交易商定金、货款及各项费用等进行资金计算、划拨的业务活动。</br></br>第十六条  结算和交收程序：</br></br>实物商品交收应当在交易所规定的时间内完成。将摘牌成功之日定义为D1交收日，交收配对成功之后的连续十五个工作日分别记为D1、D2、D3、…、D15交收日。</br></br>1、交易商应于交易前将交易资金存入交易所指定账户，用于交易的结算准备金。</br></br>2、交易当日现货挂牌交易系统闭市后，买卖双方应按现货挂牌交易合同的</br></br>约定进行交收；</br></br>3、买方应于D3交收日内，将足额货款划入交易所清算账户；</br></br>4、卖方在D3交收日内前准备好相应的货物待买方到期提取。</br></br>5、交易所收到买方全额货款后，将货物提货单交与买方，将相应的提货单和提货人信息提供给卖方或指定仓库。买方必须于收到货物提货单后，按照合同约定由买方提货人持《提货单》在D5个工作日内到合同约定的地点完成货物的提取；逾期未办理的，交易所视为买方对货物无异议；</br></br>6、货物交收或过户手续办理完毕后，买卖双方均有义务在最短时间内将货物交收情况通报交易所，买卖双方对交收货物数量确认无误后，交易所将买方80%货款划入卖方账户, 余款待买方对货物质量无异议及收到卖方全额增值税专用发票后再行划转；</br></br>7、交收质量：</br></br>（1）买方提货时可委托交易所指定检验机构对货物质量进行检验。</br></br>（2）买方对货物质量提出异议时，应在D5交收日内书面通知交易所，并附交易所指定检验机构的质检报告。</br></br>（3）卖方认可买方提出的货物质量异议的，则卖方承担相关的检验费用；同时，买卖双方就赔偿事宜进行协商或向交易所申请调解。</br></br>8、卖方应在D15交收日内按实际交货数量向买方开具全额增值税专用发票。如逾期未能开具增值税专用发票的，则每逾期一天，卖方应按未开具部分增值税专用发票金额1％向买方支付违约金；如卖方逾期超过D15交收日仍无法提供全额增值税专用发票的，交易所将从剩余货款中直接扣除违约金部分支付给买方，并将其余货款划至卖方帐户后，视为买卖双方已全面履行合同。</br></br>9、卖方交货时，实际交货数量与合同数量间允许有±10%的溢短量，有溢短量存在时，以实际交货数量进行货款结算。</br></br>第十七条  货物毁损、灭失的风险，在货物所有权转移之前由卖方承担，所有权转移之后由买方承担。</br></br>第十八条  交易商对其名下所有摊位在交易所成交的合同负有履行合同和承担风险的责任。</br></br>第十九条  交易商通过交易所现货挂牌交易系统交易发生纠纷时，可自行协商解决，也可向交易所申请调解。争议各方经协商或交易所调解，达成协议的，由交易所监督协议的履行；若在争议发生后10日内，争议各方协商不成或交易所调解无效的，交易商应将争议提交中国国际经济贸易仲裁委员会仲裁进行仲裁。</br></br>第二十条  挂牌交易违约处理</br></br>1、下列属于现货挂牌交收违约行为：</br></br>（1）、买方未按合同约定及时交纳全额货款的；</br></br>（2）、卖方未按合同约定及时提供足额有货凭证的；</br></br>（3）、卖方交付的货物质量不符合合同约定标准的；</br></br>（4）、卖方在规定的期限内未将足额增值税发票送达买方的；</br></br>（5）、买方或卖方违反合同的其他约定的；</br></br>出现上述第1、2项的违约情况，交易所将违约方履约保证金划给守约方作为违约赔偿，合同解除。</br></br>出现上述第3项违约情况，该货物的处理由买卖双方自行协商。协商不成，则由交易所将卖方履约保证金作为赔偿金划归买方，合同解除。</br></br>出现上述第4项违约情况，在买方同意下双方协商解决，协商不成的，交易所将扣除卖方剩余货款作为违约金支付给买方，视为本合同已履行完毕。</br></br>出现上述第5项违约情况，按合同约定和交易所其他规则执行</br></br>2、出现双方全部违约的则交易所扣除双方履约保证金的50%，并纳入交易所的会员风险管理基金统一管理，余款返还同时合同解除。</br></br>3、 发生违约行为的会员及交收库场有义务提供与违约行为相关的证据材料。会员及交收库场拒不提供证据的，不影响对违约事实的认定。</br></br>4、 因不可抗力因素，导致电子交易合同不能履行或不能完全履行的，受不可抗力影响的一方可依法部分或全部免除责任。</br></br>第二十一条  本办法的解释权属本交易平台。</br></br>第二十二条  本办法自2020年9月1日起实施。
														</view>
													</scroll-view>
												</view>
												
												
					</view>
					<view class="FX-c w100" style="margin: 20rpx 0;">
						<tui-button type="bronze" width="280rpx" height="90rpx" :size="32" @click="confirm">确定</tui-button>
					</view>
				</view>
			</tui-bottom-popup>
	</view>
</template>

<script>
import App from '../../App.vue'
import { mapMutations } from 'vuex';
export default {
	computed: {
		disabled: function() {
			let regs = /^[1][3,4,5,7,8][0-9]{9}$/;
			let bool = true;
			if (this.mobile && regs.test(this.mobile) && this.password) {
				bool = false;
			}
			return bool;
		},
		disableds: function() {
			let regs = /^[1][3,4,5,7,8][0-9]{9}$/;
			let bool = true;
			if (this.mobiles && regs.test(this.mobiles) && this.code && this.passwords && this.passwordss && this.check==true) {
				bool = false;
			}
			return bool;
		},
		
	},
	data() {
		return {
			navbar: [
				{name: "用户登录"},
				{name: "用户注册"},
			],
			regionArr: [
				{
					title:"../../static/img/login1.png",
					text:'../../static/img/login2.jpg',
					txt:'../../static/img/login1.jpg',
				},
			],
			butbool:false,
			testSecond: 0,
			currentTab: 0,
			mobile: '',password: '',
			mobiles: '',passwords: '',passwordss: '',code: '',
			word: '获取验证码',
			check:true,
			cls:false,isOvertime:false,
			boola:true,boolb:true,
			boolas:true,boolbs:true,boolcs:true,
			tap1:false,tap2:false,tap3:false,
			bottomPopup: false,
			popupShow: false,
			isSend: false,
			btnSendText: '获取验证码' //倒计时格式：(60秒)
		};
	},
	onLaunch() {
		
	},
	onLoad(options) {
		setTimeout(() => {
			this.logout();
		}, 0);
		console.log(this.check)
	},
	methods: {	
		...mapMutations(['login', 'logout']),
		back() {
			uni.navigateBack();
		},
		hideModal: function() {
			this.bottomPopup = false;
		},
		confirm: function() {
			this.bottomPopup = false;
		},
		showModal1: function() {this.bottomPopup = true;
			this.tap1 = true;this.tap2 = false;this.tap3 = false;
		},showModal2: function() {this.bottomPopup = true;
			this.tap2 = true;this.tap1 = false;this.tap3 = false;
		},showModal3: function() {this.bottomPopup = true;
			this.tap3 = true;this.tap1 = false;this.tap2 = false;
		},
		inputMobile: function(e) {
			let regs = /^[1][3,4,5,7,8][0-9]{9}$/;
			console.log(this.mobile)
			if(!this.mobile){this.boola=false;    
				uni.showToast({
					icon: 'none',
					title: '手机号不可为空'
				});
			}else if(!regs.test(this.mobile)){this.boola=false;  
				uni.showToast({
					icon: 'none',
					title: '请确认手机号是否正确'
				});}else{this.boola=true;}
			this.mobile = e.detail.value;
		},inputPwd: function(e) {
			if(!this.password){this.boolb=false;
				uni.showToast({
					icon: 'none',
					title: '密码不可为空'
				});}else{this.boolb=true;}
			this.password = e.detail.value;
		},
		inputMobiles: function(e) {
			let regs = /^[1][3,4,5,7,8][0-9]{9}$/;
			console.log(this.mobiles);
			this.butbool=false;this.btnSendText="获取验证码";
			if(this.mobiles.length==11&&regs.test(this.mobiles)){
				this.cls=true;this.boolas=true;
			}else if(this.mobiles.length!=11||!regs.test(this.mobiles)){
				this.cls=false;
			}else if(!this.mobiles){
				this.boolas=false;this.cls=false;
				uni.showToast({
					icon: 'none',
					title: '手机号不可为空'
				});
			}else if(!regs.test(this.mobiles)&&this.mobiles.length==11){
				this.boolas=false;this.cls=false;
				uni.showToast({
					icon: 'none',
					title: '请确认手机号是否正确'
				});
			}
			this.mobiles = e.detail.value;
		},inputCodes(e) {
			if(!this.code){this.boolb=false;
				uni.showToast({
					icon: 'none',
					title: '验证码不可为空'
				});}else{this.boolb=true;}
			this.code = e.detail.value;
		},inputPwds: function(e) {
			if(this.passwords!=this.passwordss&&this.passwordss!=''){
				uni.showToast({
					icon: 'none',
					title: '请确认两次密码是否相同'
				});
			}else if(!this.passwords){this.boolbs=false;
				uni.showToast({
					icon: 'none',
					title: '密码不可为空'
				});}else{this.boolbs=true;}
			this.password = e.detail.value;
		},inputPwdss: function(e) {
			if(!this.passwordss){this.boolbs=false;
				uni.showToast({
					icon: 'none',
					title: '确认密码不可为空'
				})
			}else if(this.passwords!=this.passwordss){this.boolbs=false;
				uni.showToast({
					icon: 'none',
					title: '请确认两次密码是否相同'
				});}else{this.boolbs=true;}
			this.password = e.detail.value;
		},messages(){
			console.log('点击了')
			let regs = /^[1][3,4,5,7,8][0-9]{9}$/;
			var that = this;
			if(that.mobiles!=''&&regs.test(that.mobiles)){
				console.log('执行')
				uni.showLoading({title:"正在获取...",mask:true})
				var phone ={'mobile':this.mobiles}
				uni.request({
					url:App.verifyCode,
					method: 'POST',
					data: phone,
					success: (res)=>{
						uni.hideLoading();
						console.log("请求成功")
						console.log(res)
						if(res.data.status==200){
							that.testSecond=60;
							that.btnSendText="S秒后重试";
							that.butbool=true;
							that.cls=false;
							setTimeout(function(){
								that.butbool=false;
								that.cls=true;
								that.testSecond=0;
								that.btnSendText="获取验证码";
							},60000)
							uni.setStorage({
								key:'token',
								data:res.data.data.token,
								success(res){
									console.log(res)
								}
							})
						}else if(res.data.status!=200){
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						}
					},
					fail: (err)=>{
						uni.hideLoading();
						that.butbool=false;
						console.log("请求失败")
						console.log(err)
							uni.showToast({
								icon: 'none',
								title: '请求失败，请检查网络是否正常'
							})
						setTimeout(function(){
							// that.tankuang=false;
						},1000)
					}
				})
			}
		},
		onregister(){
			var that =this;
			var regist ={'mobile':this.mobiles,'phonecode':this.code,'pwd':this.passwords}
			uni.request({
				url:App.register,method: 'POST',data: regist,
				success: (res)=>{
					console.log("请求成功")
					console.log(res)
					if(res.data.status==200){
						uni.showToast({
							icon: 'none',
							title: '注册成功'
						})
						setTimeout(function(){
							that.currentTab=0;
							that.mobile='';that.password='',
							that.mobiles='';that.code='';that.passwords='';that.passwordss='';
						},1500);
						setTimeout(function(){
							uni.showToast({
								icon: 'none',
								title: '请登录'
							})
						},1800);
					}else{
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				},
				fail: (err)=>{
					console.log("请求失败")
					console.log(err)
					that.tankuang=true;
					that.tishi = '登录失败，请重新登录!'
					setTimeout(function(){
						that.tankuang=false;
					},1000)
				}
			})
		},
		onlogin(){
			var that =this;
			var login ={'account':this.mobile,'password':this.password,"type":1}
			uni.request({
				url:App.login,method: 'POST',data: login,
				success: (res)=>{
					console.log("请求成功")
					console.log(res)
					if(res.data.msg=="登录成功"){
						// var tokens =res.data.data.token
							uni.setStorageSync('token',res.data.data.token);
							uni.setStorageSync('user',res.data.data.u_auth);
							//（{
							// 	key:'token',
							// 	data:res.data.data.token,
							// 	success(res){
							// 		console.log(res)
							// 	}
							// })
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						setTimeout(function(){
							uni.switchTab({
								url: "../index/index"
							})
						},1000);
					}else{
						uni.showToast({
							icon: 'none',
							title: '登录失败'
						})
					}
				},
				fail: (err)=>{
					console.log("请求失败")
					console.log(err)
					// that.tankuang=true;
					// that.tishi = '登录失败，请重新登录!'
					setTimeout(function(){
						// that.tankuang=false;
					},1000)
				}
			})
		},
		protocol(){
			this.tui.href("/pages/doc/protocol/protocol")
		},
		change(e) {
			var that =this;
			this.currentTab = e.index
			if(that.currentTab==0){
				that.mobile='';that.password='';
			}else if(that.currentTab==1){
				that.mobiles='';that.code='';that.passwords='';that.passwordss='';that.cls=false;
			}
		},
		goNavBar() {
			uni.navigateTo({
				url: "/pages/index/navbar/navbar"
			})
		},
		checked(e){
			var the =this;
			console.log(e)
			if(this.check==true){
				this.check = false;
			}else if(this.check==false){
				this.check = true;
			}
		},
		clearInput(type) {
			if (type == 1) {
				this.mobile = '';
				this.mobiles = '';
			} else {
				this.password = '';
				this.passwords = '';
			}
		},
		href(type) {
			let url = '../forgetPwd/forgetPwd';
			if (type == 2) {
				url = '../reg/reg';
			}
			this.tui.href(url);
		},
		showOtherLogin() {
			//打开后 不再关闭
			this.popupShow = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.loginImg{
		height: 320rpx;
		margin-bottom: 100rpx;
		.logo{
			width: 160rpx;
			height: 160rpx;
			background-color: #fff;
			bottom:-60rpx;
			box-sizing: border-box;
			box-shadow: 0 0 20rpx #ccc;
			border-radius: 40rpx;
			// padding: 5%;
			.img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.tui-page-title {
		width: 100%;
		font-size: 48rpx;
		font-weight: bold;
		color: $uni-text-color;
		line-height: 42rpx;
		padding: 110rpx 40rpx 40rpx 40rpx;
		box-sizing: border-box;
	}
	.tui-form {
		// padding-top: 50rpx;
		.tui-view-input {
			width: 100%;
			box-sizing: border-box;
			padding: 0 40rpx;
			.tui-cell-input {
				width: 100%;
				display: flex;
				align-items: center;
				padding-top: 24rpx;
				padding-bottom: $uni-spacing-col-base;
				input {
					flex: 1;
					padding-left: $uni-spacing-row-base;
				}
				.tui-icon-close {
					margin-left: auto;
				}
				.tui-btn-send {
					width: 156rpx;
					text-align: right;
					flex-shrink: 0;
					font-size: $uni-font-size-base;
					color: $uni-color-primary;
				}
				.tui-gray {
					color: $uni-text-color-placeholder;
				}
			}
		}
		.tui-cell-text {
			width: 100%;
			padding: 40rpx $uni-spacing-row-lg;
			box-sizing: border-box;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
			display: flex;
			align-items: center;
			.tui-color-primary {
				color: $uni-color-primary;
				padding-left: $uni-spacing-row-sm;
			}
		}
		.tui-btn-box {
			width: 100%;
			padding: 0 $uni-spacing-row-lg;
			box-sizing: border-box;
			// margin-top: 80rpx;
		}
	}
}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

.region-box{
	// height: 26rem;
	// overflow-y: auto;
}
.region-txt{
	height: 26rem;
	overflow-y: auto;
}
.region-box .img1{
	width: 100%;
	height: 160rem;
}
.region-box .img2{
	width: 100%;
	height: 50rem;
}
.region-box .img3{
	width: 100%;
	height: 200rem;
}
.scroll_text{
  height: 796rpx;
 }
.subtxt{
	line-height: 48rpx;
	margin: 8rpx;
}
	.sub{
		font-size: 28rpx;
		padding: 0;
		// width: 30%;
		// height: 1.4rem;
		// line-height: 1.4rem;
		border-radius: 10rpx;
		color: #FFFFFF;
		background-color:#9E2036;
	}
	.subs{
		font-size: 28rpx;
		padding: 0;
		// width: 30%;
		// height: 1.4rem;
		// line-height: 1.4rem;
		border-radius: 10rpx;
		color: #FFFFFF;
		background-color:#ccc;
	}
	.user_service, .management, .privacy{
			padding: 30rpx;
		}
		.user_service_title{
			font-size: 40rpx;
			font-weight: bold;
			text-align: center;
			line-height: 100rpx;
		}
		.management_title, .privacy_title{
			font-size: 40rpx;
			font-weight: bold;
			text-align: center;
			line-height: 120rpx;
		}
		.user_service_subtitle{
			font-size: 30rpx;
			font-weight: bold;
			line-height: 80rpx;
		}
		.user_service_text, .management_text, .privacy_text{
			font-size: 28rpx;
			line-height: 36rpx;
		}
</style>

