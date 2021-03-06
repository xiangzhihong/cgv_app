import React, {useContext, useEffect} from 'react'
import {ScrollView, StyleSheet, Text} from 'react-native'

export default () => {

    return (
        <ScrollView style={{backgroundColor: '#fff', padding: 15}}>
            <Text style={styles.textStyle}>网站定义</Text>
            <Text
                style={styles.textStyle2}>&emsp;&emsp;本政策适用于CGV电影平台提供的所有服务（以下称“服务”或“我们的服务”），您访问CGV电影网站平台及/或登录相关客户端使用CGV影城提供的服务，均适用于本政策。</Text>
            <Text
                style={styles.textStyle2}>&emsp;&emsp;“我们”指CGV电影网站（域名为www.cgv.com.cn）、CGV电影购票APP、CGV影城微信公众号平台、CGV影城小程序等其他使用CGV影城票务服务的H5频道页面。</Text>
            <Text
                style={styles.textStyle2}>&emsp;&emsp;网站会员：指为获得网站网络服务，须接受本网站全部服务条款，并按照网站页面操作规则完成全部注册程序，成为网站会员（以下称“会员”）。</Text>
            <Text
                style={styles.textStyle2}>&emsp;&emsp;CGV影城（下称“我们”）尊重和保护会员隐私，在您使用我们平台提供的服务时，我们将按照本隐私权政策使用及共享您的个人信息。本隐私权政策包含了我们使用、存储、共享和保护您的个人信息的条款，我们希望通过本隐私权政策向您清晰地介绍我们对您个人信息的处理方式，因此我们建议您完整地阅读本隐私权政策，以帮助您了解维护自己隐私权的方式。</Text>
            <Text style={styles.textStyle4}>&emsp;&emsp;您使用或继续使用我们的服务，即意味着同意我们按照本《隐私权政策》收集、使用、储存和分享您的想关信息。</Text>
            <Text style={styles.textStyle}>一、个人信息的收集 </Text>
            <Text style={styles.textStyle3}>&emsp;&emsp;为了向您提供更好、更优、更个性化的服务，
                我们在您进行会员注册，购买物品或服务以及咨询及投诉邀请业务时，通过网页、书面、电话等形式收集您提供的个人信息。</Text>
            <Text style={styles.textStyle}>二、个人信息使用和目的</Text>
            <Text
                style={styles.textStyle1}>&emsp;&emsp;为了向您提供服务及提升服务质量，我们将根据以下目的来使用您的个人信息（个人信息包括但不限于您的联系方式、性别、出生年月、消费信息等）：</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;①
                会员注册及管理；包括在确认会员注册意向和提供会员制服务时所需要的本人识别及认证、会员资格管理、防止不当利用CGV提供的服务，以及在使用未满14周岁儿童的个人信息时征求监护人同意，各种告知及通报和不满事项的使用等</Text>
            <Text style={styles.textStyle3}>&emsp;&emsp;②
                提供物品或服务；包括物品配送、服务提供、合同书及通知单发送、产品提供、定制服务提供、本人认证、年龄认证、费用计算及核算、债权追讨等。</Text>
            <Text style={styles.textStyle}>三、个人信息存</Text>
            <Text
                style={styles.textStyle3}>&emsp;&emsp;我们收集的有关您的信息和资料将保存在我们和/或我们的关联公司的服务器上，这些信息和资料可能传送至您所在的国家、地区或收集信息和资料所在地并在该地被访问、存储和展示。我们将在实现本隐私政策中所述目的所必需的期间内保留您的个人信息，除非法律要求或允许在更长的期间内保留这些信息。</Text>
            <Text style={styles.textStyle}>四、个人信息的共享</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;我们对您的信息承担保密义务，除以下情形外，未经您同意，我们不会与任何第三方分享您的个人信息：</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;1)
                我们以及我们的关联公司，可能将您的个人信息与我们的关联公司、合作伙伴及第三方服务供应商、承包商及代理分享，用作下列用途：</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;① 向您提供第（1）条“个人信息使用目的”部分所述服务；</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;② 由第三方向我们提供特定服务，如执行订单、解答您的问题或意见、提供抽奖奖品、实施消费者调查等；</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;③ 履行我们在《CGV服务协议》或本《隐私政策》中的义务和行使我们的权利；</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;④ 通过第三方管理或补充我们的数据库；</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;⑤ 维护和改善我们的服务。</Text>
            <Text
                style={styles.textStyle1}>&emsp;&emsp;如我们或我们的关联公司与任何上述第三方分享您的个人信息，我们将要求该等第三方在使用您的个人信息时遵守本《隐私政策》及我们要求其遵守的其他适当的保密和安全措施。</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;2)
                在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;3) 我们或我们的关联公司还可能为以下需要而保留、保存或披露您的个人信息：</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;① 遵守适用的法律法规；</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;② 遵守法院命令或其他法律程序的规定；</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;③ 遵守相关政府机关的要求；</Text>
            <Text style={styles.textStyle3}>&emsp;&emsp;④
                为遵守适用的法律法规、维护社会公共利益，或保护我们的客户、我们或我们的集团公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。</Text>
            <Text style={styles.textStyle}>五、个人信息的保护</Text>
            <Text style={styles.textStyle3}>
                CGV非常重视您的个人信息安全，我们将竭尽全力安全使用和保护您提供的个人信息，包括努力采取各种合理的物理、电子和管理方面的安全措施来保护您的个人信息，并尽最大合理努力使您的个人信息不会被泄漏、毁损或者丢失，包括但不限于SSL、信息加密存储、数据中心的访问控制、启动杀毒软件。我们对可能接触到您个人信息的员工或外包人员限制在最少人数，并采取严格管理，包括但不限于采取信息访问权限控制、与接触个人信息的人员签署保密协议、进行个人信息保护的相关教育、监控该等人员的操作情况等措施。但互联网并非是绝对安全的环境，我们强烈建议您通过安全方式、尽量使用复杂密码，协助我们保证您的账号安全。另外请注意妥善保护自己的个人信息，仅在有必要的情形下向他人提供。如您发现自己的个人信息尤其是您的账户信息发生泄漏，请您立即联系就近CGV影城的客服，以便我们根据您的申请采取相应措施。
            </Text>
            <Text style={styles.textStyle}>六、您对自己信息的管理</Text>
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
            <Text style={[styles.textStyle3]}>&emsp;&emsp;如果您有任何疑问、意见或建议，您可以通过联系就近CGV影城的客服与我们联系。</Text>

            <Text style={styles.textStyle3}>&emsp;&emsp;</Text>

            <Text style={styles.textStyle}/>
            <Text style={styles.textStyle1}>&emsp;</Text>
            <Text style={styles.textStyle1}>&emsp;&emsp;</Text>
            <Text style={styles.textStyle1}>&emsp;</Text>
            <Text style={styles.textStyle1}/>
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
        marginTop: 10,
        marginBottom: 5,
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
    },
    textStyle3: {
        fontSize: 13,
        lineHeight: 20,
        color: '#777777',
        marginBottom: 18,
    },
})
