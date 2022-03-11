import React, {useContext, useEffect} from 'react'
import {ScrollView, StyleSheet, Text} from 'react-native'

export default () => {
    return (
        <ScrollView style={{backgroundColor: '#fff', padding: 15}}>
            <Text style={styles.textStyle4}>
                CGV电影客户端是指CGV电影网站（包括CGV电影购票APP、CGV影城微信公众号、CGV影城小程序）。基于CGV电影网站（以下称“网站”）所提供的网络服务的重要性，网站用户（以下称“用户”或“您”）为获得网站网络服务，须接受本网站全部服务条款，并按照网站页面操作规则完成全部注册程序，成为网站会员（以下称“网站会员”）。
            </Text>
            <Text style={styles.textStyle}>一、网站会员权限</Text>
            <Text style={styles.textStyle1}>&emsp;
                （1）网站会员可使用网站在线购票等功能（具体功能以网站发布为准）。每位用户（每台设备）每天限购6张影票（个别促销场次除外）。
            </Text>
            <Text style={styles.textStyle1}>&emsp;
                （2）网站会员可享受网站会员CGV国际影城（以下称“影城”）电影票价优惠折扣（具体票价优惠政策以网站或各影城发布为准）和会员积分。
            </Text>
            <Text style={styles.textStyle3}>&emsp;
                （3）网站会员可实现与影城会员卡关联（具体关联方式等以网站发布为准）。成功关联后可在网站使用。
            </Text>

            <Text style={styles.textStyle}>
                二、网站服务使用说明
            </Text>
            <Text style={styles.textStyle1}>&emsp;
                （1）用户接受网站服务必须提供详尽、准确的个人资料，如个人资料有任何变动，必须及时更新注册资料。
            </Text><Text style={styles.textStyle1}>&emsp;
            （2）用户一旦注册成功，成为网站会员，用户应对其用户帐号和密码安全负全部责任，并对以其用户帐号进行的所有活动和事件负全部责任。用户可随时更改其密码。用户若发现任何非法使用其用户帐号或其用户帐号存在安全漏洞的情况，应立即通知网站。
        </Text><Text style={styles.textStyle1}>&emsp;
            （3）网站将通过电子邮件、短信或其他联系方式向用户发送有关商业信息或通知。
        </Text><Text style={styles.textStyle1}>&emsp;
            （4）网站不对用户所发布信息的删除或储存失败等负责。用户发布的信息应当符合网站服务条款及相关法律法规的规定。如用户违反前述规定，网站有权中断、终止该用户提供网站网络服务并取消该用户账号，且不承担任何责任。
        </Text><Text style={styles.textStyle3}>&emsp;
            （5）所有发给用户的通知（包括但不限于网站服务条款的修改、网站服务内容的变更以及其它重要事项等）都可通过网站页面公告或电子邮件或常规信件形式传送。
        </Text>

            <Text style={styles.textStyle}>
                三、服务条款修改和网站服务中断、终止
            </Text>
            <Text style={styles.textStyle1}>&emsp;
                1、服务条款的修改
            </Text><Text style={styles.textStyle1}>&emsp;
            网站有权修改网站服务条款。网站服务条款一旦发生变动，将会在网站页面上提示变动内容。如用户不同意所变动内容，用户有权停止使用网站网络服务；如用户继续享用网站网络服务，则视为用户接受服务条款变动。
        </Text><Text style={styles.textStyle1}>&emsp;
            2、服务条款的终止
        </Text><Text style={styles.textStyle1}>
            【用户发起的终止】您有权通过以下方式终止本协议：
        </Text><Text style={styles.textStyle1}>&emsp;
            用户有权随时终止使用网站服务,联系离您最近的影城申请注销您的账户并删除您的个人信息。在注销账户之后，我们将停止为您提供产品或服务，根据适用法律的要求删除您的个人信息，或使其匿名化处理。
        </Text><Text style={styles.textStyle1}>&emsp;
            【网站发起的终止】出现以下情况时，网站可以依据本条例中断或终止网站服务协议而无需对任何用户或第三方负和人责任：
        </Text><Text style={styles.textStyle1}>&emsp;
            （一）您违反本协议约定，网站依据违约条款终止本协议；
        </Text><Text style={styles.textStyle1}>&emsp;
            （二）您盗用他人账户、发布违禁信息、采取不正当手段谋利等行为，网站依据规则对您的账户给予查封；
        </Text><Text style={styles.textStyle1}>&emsp;
            （三）如用户提供的资料不真实或违反本服务条款，网站有权随时中断或终止为该用户提供网络服务而无需通知用户，且无需对用户或任何第三方承担任何责任。
        </Text><Text style={styles.textStyle1}>&emsp;
            （四）除上述情形外，因您多次违反网站规则相关规定且情节严重，网站依据规则对您的账户予以查封；
        </Text><Text style={styles.textStyle1}>&emsp;
            （五）其它应当终止服务情况的。
        </Text><Text style={styles.textStyle1}>
            如用户对前述服务中断或终止存有异议，可行使如下权利：
        </Text><Text style={styles.textStyle1}>&emsp;
            （1）停止使用网站的网络服务；
        </Text><Text style={styles.textStyle1}>&emsp;
            （2）通知网站停止对该用户的服务；
        </Text><Text style={styles.textStyle3}>&emsp;
            用户行使上述权利后，其使用网站网络服务的权利即终止，该用户没有权利、网站也没有义务传送任何未处理的信息或未完成的服务给该用户或任何第三方。
        </Text>
            <Text style={styles.textStyle}>

                四、退改签协议
            </Text><Text style={styles.textStyle1}>&emsp;
            1.影片开场2小时之前且未取票时，支持退票；
        </Text><Text style={styles.textStyle1}>&emsp;
            2.如购买的是2小时内放映的场次、特殊购票场等特殊场次，不支持退换；
        </Text><Text style={styles.textStyle1}>&emsp;
            3.退票后，所使用的代金券、优惠券、积分等会原样返回到购买人账户；
        </Text><Text style={styles.textStyle1}>&emsp;
            4.不支持订单部分取消（如：购票同时购买商品的订单取消情况下，该订单将全部取消）；
        </Text><Text style={styles.textStyle1}>&emsp;
            5.购票的同时购买商品订单中，商品兑换有效期至影片观影后1天，过期不可兑换；
        </Text><Text style={styles.textStyle1}>&emsp;
            6.单独购买的商品兑换有效期为购买当日起14天内，过期及已打印券不能退换 (请参考打印凭条提示)；
        </Text><Text style={styles.textStyle1}>&emsp;
            7.影片放映时间过期的情况，影票视为作费，不可进行退票，请注意影片放映时间；
        </Text><Text style={styles.textStyle3}>&emsp;
            8.上述退票规则适用于CGV影城APP、公众号及小程序。
        </Text>
            <Text style={styles.textStyle}>

                五、用户责任与义务
            </Text><Text style={styles.textStyle1}>&emsp;
            （1）用户使用网站负有以下责任及义务：
        </Text><Text style={styles.textStyle1}>&emsp;
            ① 使用网站网络必须遵守中国相关法律法规及政策的规定；
        </Text><Text style={styles.textStyle1}>&emsp;
            ② 不得以任何非法目的使用网站；
        </Text><Text style={styles.textStyle1}>&emsp;
            ③ 不干扰或破坏网站网络服务；
        </Text><Text style={styles.textStyle1}>&emsp;
            ④ 遵守所有使用网站网络服务的网络协议、规定、程序和惯例等；
        </Text><Text style={styles.textStyle1}>&emsp;
            ⑤ 不得传输任何非法的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的、淫秽的信息/资料
        </Text><Text style={styles.textStyle1}>&emsp;
            ⑥ 不得传输任何教唆他人犯罪的信息和资料;
        </Text><Text style={styles.textStyle1}>&emsp;
            ⑦ 不得传输有损国家利益和涉及国家安全的信息和资料；
        </Text><Text style={styles.textStyle1}>&emsp;
            ⑧ 不得未经许可而非法进入其它电脑系统;
        </Text><Text style={styles.textStyle1}>&emsp;
            ⑨ 不得传播反动的、色情的信息和资料。
        </Text><Text style={styles.textStyle1}>&emsp;
            （2）若用户违反上述责任与义务，网站有权作出独立判断并立即采取措施，如删除用户发布的信息、保存网站的系统记录作为证据、向相关主管部门举报、中断或终止向用户提供网络服务、取消用户的服务帐号等，且网站的系统记录有可能作为用户违反法律等相关规定的证据。
        </Text><Text style={styles.textStyle3}>&emsp;
            （3）用户须对自己在使用网站服务过程中的行为承担法律责任。如因用户违反本服务条款或违反有关的法律法规而给网站或任何第三人造成损失，该用户应承担因此产生的一切责任。
        </Text>
            <Text style={styles.textStyle}>
                六、网站网络服务内容所有权
            </Text><Text style={styles.textStyle1}>&emsp;
            （1）网站网络服务内容包括：文字、软件、声音、图片、录象、图表等。所有这些内容受著作权法、商标法、专利法及其他相关法律的保护。
        </Text><Text style={styles.textStyle1}>&emsp;
            （2）用户只能在网站或相关权利人授权下才能使用网站上述内容，不能擅自复制、再造这些内容，或者创造与这些内容有关的派生/衍生产品。
        </Text><Text style={styles.textStyle3}>&emsp;
            （3）网站所有的文章等作品知识产权归作品作者和/或网站所有，任何人需要转载网站文章等作品，必须事先征得作品作者和/或网站书面授权。
        </Text>
            <Text style={styles.textStyle}>
                七、免责条款
            </Text><Text style={styles.textStyle1}>&emsp;
            （1）用户自行承担使用网站网络服务所存在的一切风险以及因使用网站网络服务而产生的一切后果，网站对用户不承担任何责任。
        </Text><Text style={styles.textStyle1}>&emsp;
            （2）网站不承诺所提供服务一定能满足用户要求，也不承诺服务不会中断。受限于网站的使用需依赖网络，且以目前的技术尚无法杜绝技术性故障，无法完全防范不法侵害，因此网站也不对服务的及时性、绝对安全性做出承诺，任何非因网站本身过错导致的损害，网站均不承担责任。网站仅为用户与商品或服务提供者提供交易场所及便利，网站不对用户在网站上得到的任何商品购物服务或交易进行担保。
        </Text><Text style={styles.textStyle1}>&emsp;
            （3）网站对任何直接、间接、偶然、特殊或继起的任何损害均不负责任。这些损害可能来自：不正当使用网络服务，非法使用网络服务或用户传送的信息有所变动等。
        </Text><Text style={styles.textStyle1}>&emsp;
            （4）用户不得在其发表的信息中加入宣传资料或参与广告策划，在网站的免费服务上展示其产品，任何这类行为（包括但不限于运输货物、付款、服务、商业条件、担保及与广告有关的描述等），如有前述行为，则均只在相应的用户和广告商等之间发生，网站不对此类行为承担任何责任。
        </Text><Text style={styles.textStyle1}>&emsp;
            （5）因系统缺陷、黑客攻击、计算机病毒侵入或发作、政府管制等意外事件或不可抗力造成网站不能正常经营，网站不承担任何法律责任。
        </Text><Text style={styles.textStyle3}>&emsp;
            （6）为了维护网站以及所有会员合法权益，提供必要用户信息至第三方（如腾讯云等）进行安全性审核，不视为违反隐私制度。
        </Text>
            <Text style={styles.textStyle}>
                八、法律适用和管辖
            </Text><Text style={styles.textStyle3}>&emsp;
            本服务条款的订立、履行、解释以及因此而发生的一切争议，均适用中华人民共和国（为本服务条款目的，不含港、澳、台地区）的法律。就本服务条款所发生的一切争议，均应通过友好协商解决；如协商不成，任何一方均可向网站所在地人民法院提起诉讼。
        </Text>
            <Text style={styles.textStyle}>
                九、其他
            </Text><Text style={styles.textStyle3}>&emsp;
            本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
        </Text>


            <Text style={styles.textStyle3}>&emsp;&emsp;</Text>

            <Text style={styles.textStyle}></Text>
            <Text style={styles.textStyle1}>&emsp;</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;</Text>
            <Text style={styles.textStyle1}>&emsp;</Text>
            <Text style={styles.textStyle1}></Text>


            <Text style={styles.textStyle}></Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;我们提供了便捷的方法，让您可以查询、更正自己的账户信息等使用我们服务时您提供的个人信息。例如您可以登录“我的CGV
                ”、我的订单等查询、修改自己的个人资料、隐私设置、安全设置。</Text>
            <Text
                style={styles.textStyle3}>&emsp;&emsp;如果您认为CGV存在违反法律、行政法规的规定或者违反您的约定收集、使用您个人信息的，您可以通过就近CGV影城的客服与我们取得联系。</Text>
            <Text style={styles.textStyle}>七、未成年人保护</Text>
            <Text
                style={styles.textStyle3}>&emsp;&emsp;我们重视未成年人的个人信息保护，未满14岁的未成年人在未经得监护人的同意时无法注册成为CGV网站的会员。如您为未满14周岁的未成年人，建议您请您的监护人仔细阅读本隐私权政策，并在征得您的监护人同意的前提下使用我们的服务或向我们提供信息。</Text>
            <Text style={styles.textStyle}>八、本政策的修订</Text>
            <Text
                style={styles.textStyle3}>&emsp;&emsp;我们可能不定期地修改本《隐私权政策》，变更后的《隐私权政策》将在修订生效前通过www.cgv.com.cn公告、官方APP公告或以其他适当方式通知您。该等情况下，若您继续使用我们的服务，即表示同意受经修订的《隐私权政策》的约束。</Text>
            <Text style={styles.textStyle}>九、如何联系我们</Text>
            <Text style={styles.textStyle3}>&emsp;&emsp;如果您有任何疑问、意见或建议，您可以通过联系就近CGV影城的客服与我们联系。</Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textStyle: {
        fontSize: 13,
        color: '#333333',
        fontWeight: 'bold',
    },
    textStyle2: {
        fontSize: 13,
        lineHeight: 20,
        color: '#333333',
    },
    textStyle4: {
        fontSize: 13,
        lineHeight: 20,
        color: '#333333',
        marginBottom: 18,
    },
    textStyle1: {
        fontSize: 13,
        lineHeight: 20,
        color: '#777777',
        marginTop: 5,
    },
    textStyle3: {
        fontSize: 13,
        lineHeight: 20,
        color: '#777777',
        marginBottom: 18,
    },
})
