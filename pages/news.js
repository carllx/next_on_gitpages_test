import {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import withRedux from 'next-redux-wrapper'
import {css} from 'glamor'
import NoSSR from 'react-no-ssr';
import Head from 'next/head'
import {GR , makeKEY , perspZ}  from '~/utils/ui'
import {isMobile  ,isTablet , getLanguer}  from '~/utils/device'
import {switchLanguage,onDevice} from'~/reducers/root'

import Scroller from '~/components/controller.scroll'
import Resizer from '~/components/controller.resize'
import Nav from '~/components/nav'
import Seczione from '~/components/section'
import {initStore} from '~/store'

import md from 'markdown-in-js'



class News extends PureComponent {

  static async getInitialProps({ isServer, query }) {
      /*es: query :{ id: 'EnzoCucchi' }*/
      const post = require(`../static/contents/news/${query.id}`);
      return { ...post }
  }

  constructor(props) {
    super(props)
  }

  setLanguage = (language) => {
      this.props.switchLanguage(language)
  }


  setDevice = () => {
      let whatDevice;
      if (isMobile()) { whatDevice = 'mobile' } else if (isTablet()) { whatDevice = 'tablet' } else { whatDevice = 'desktop' }
      this.props.onDevice(whatDevice)
  }


  componentDidMount() {
      // DEVICE
      this.setDevice()
      /* LANGUGE */
      this.setLanguage(getLanguer())
  }

  render () {

    const {language } = this.props ||{language:'zh'}
    const {vw,vh,is_landscape} = this.props.view_size||{view_size:{vw:0,vh:0,is_landscap:false}}
    const WIDTH = is_landscape?GR.px(1,vw):GR.px(0.4,vw)

    return (
      <main
       key = {`page-${this.props.id}` }
       >
        <Head>
            <title>{this.props.title[language]}</title>
            {/*meta 不支持重复 property*/}
            <meta content={`ZAI - ${this.props.title[language]}`} name='title' />
            <meta content={`ZAI - ${this.props.title[language]}`} property='og:title' />
            <meta content={`ZAI - ${this.props.title.zh} ${this.props.title[language]} ${this.props.title.en}`} name='description' />
            <meta content={`ZAI - ${this.props.title.zh} ${this.props.title[language]} ${this.props.title.en}`} property='og:description' />
            <meta content={`${this.props.keywords} ZAI,中艺国际, zhongart, firenze, Gallery, arte, 佛罗伦萨 `} name='keywords' />
            <meta content='article' property='og:type' />

            <meta content={`http://www.zhongart.it/news/${this.props.id}`} property='og:url' />

            {/*
            <meta content='//s3.amazonaws.com/所用的图片' property='og:image' />
            */}

            {/*<style dangerouslySetInnerHTML={{ __html: this.props.css }} />*/}

        </Head>




      {/*3D Parallax*/}
      <div>


        {/* 头像和描述
        宽屏--横向2列 竖屏--1列 */}

          <div
          {...css({
              // is_landscape
              display:'flex',
              flexDirection:'column',
              marginTop: `${is_landscape?GR.vw(7):GR.vw(6)}vw`,
              marginBottom: is_landscape?`${GR.vw(7)}vh`:`${GR.vw(7)}vw`,
              // transform: `rotate3d(${this.state.tiltx},${this.state.tilty},0,${this.state.degree}deg)`,
              // transition: `transform 1s cubic-bezier(0.1, 0.5, 0.4, 1)`,
            })}
           key= {`${this.props.id}-${this.props.language}`}
          >

            {md`## 2018中国艺术家赴意大利佛罗伦萨驻留计划

中国、意大利两国都是文明古国，在世界文明的发展史上有着不可替代的地位。在浩瀚的历史的长河中，两国之间的文化交流很早就有确凿的史料记述，早在我国明代，意大利传教士利玛窦来华，将西方优秀文化带入中国，并在中国绘制了《山海舆地图》。清代，又有意大利艺术家郎世宁来华任宫廷画师，曾参与皇家园林圆明园西洋楼的设计。郎世宁的画作创造了新的样式，兼顾了中国审美观念，同时又把西方创作的方式结合起来，其诸多作品至今都还收藏在故宫博物院中。纵观艺术发展史，中意两国艺术源远流长，作为文艺复兴发祥地的意大利率先将绘画从宗教和祭坛中独立出来，成为重要的艺术门类后，影响了整个欧洲继而影响到全世界。而作为中华文明象征的水墨艺术历经千年传承，在21世纪的今天也成为世界范围内的重要艺术表达手段。就像这两种不同的艺术样式间日渐交融的趋势一样，中意两国的艺术也在不断地深入交流与发展。在这一趋势下，青年艺术家之间的交流显得尤为重要，他们是当今青年艺术的现实面貌，代表着两国当代艺术的发展的未来。
新世纪以来，越来越多的学子进入艺术院校学习，越来越多的艺术青年也从高校步入社会。高等艺术教育的发展蓬勃，同时，众多富有艺术才华的青年学子初毕业，即因市场与就业的压力，放弃了艺术之路，这实在是高等艺术教育、乃至中国文化事业发展的一大憾事。同样，西方也面临着相似的问题。
为了加强中国、意大利在文化艺术领域的进一步交流，培育更多优秀的艺术家，使双方在艺术创作、理论研究、展览策划等领域进行密切而实际的合作，鼓励和推动高等学校艺术专业毕业生在学术领域能深入开展学术研究工作和在创作领域持续探索，由中国国家当代艺术档案库主任、著名艺术家方力钧先生，中国国家当代艺术档案库理事长、著名艺术家王艺先生，中国国家当代艺术档案库理事、著名收藏家丁大立先生、中艺国际文化艺术中心主席张修中先生联合设立“中国艺术家赴意大利佛罗伦萨驻留计划”基金会。旨在于打破体制机制障碍，对刚刚毕业的、有艺术理想、有艺术才华的青年学子”扶一把，送一程”。
2018年，由佛罗伦萨市政府、中国国家画院文化产业研究中心、意大利Le Murate 当代艺术中心、佛罗伦萨美术学院、时代美术馆以及中艺国际艺术文化中心联合推出“2018中国艺术家赴意大利佛罗伦萨驻留计划”，具体内容如下：

## 一、 宗旨和目标
“中国艺术家赴意大利佛罗伦萨驻留计划”以“助创、助学”为宗旨，坚持“公开公正、突出重点、择优交换”的原则。旨在鼓励和推动中意青年艺术家在艺术领域深入开展学术研究工作和在创作领域持续探索，以取得更为丰硕的艺术创作成果。

## 二、 驻留对象及驻留时间安排
### （一）首批“中意青年艺术家驻留计划”驻留艺术家在遴选上将面向全国青年艺术家开放，接受社会申请（40岁以下）。主要针对美术学院青年教师、美术学院近三年内毕业学生、具有3年以上艺术创作经验、富有独立艺术思考与突破性实践的艺术家提供申请机会。
驻留计划艺术创作以当代艺术为创作领域，创作媒介分为“绘画与雕塑”、“新媒体影像”、“声音装置艺术”三大类 。
### （二）驻留计划时间安排：
从即日起，驻留艺术家报名正式开始，报名日期截止至北京时间2018年2月28日北京时间12时，佛罗伦萨驻留计划名单录取表将在2018年3月10日北京时间12时公布，届时，将公布最终确定参加此次驻留计划的艺术家。

## 三、意大利佛罗伦萨艺术驻留计划创作主题
创作主题：
“现代城市公共空间与河流、自然环境的可持续发展与共存”
阐释：
佛罗伦萨是意大利托斯卡纳大区的首府，自11世纪建城以来，就是欧洲重要的文化、商业中心，被公认为是一个艺术城市，拥有建筑、绘画、雕塑、历史与科学等大量世界文化遗产，素有“文艺复兴之都”的美誉。阿诺河横贯整座佛罗伦萨城，在其历史和文化中占有重要地位。在历史上，阿诺河为佛罗伦萨带来过商业利益，为城市的繁荣作出过不可磨灭的贡献，但是也带来过泛滥的洪水，祸及两岸居民。因此，佛罗伦萨人对阿诺河虽说是感情深厚，但也是爱恨交加。本次艺术驻留计划力图通过对“城市与河流、自然环境”这一人类发展经久不衰的话题深入探讨，以丰富的艺术语言及多种形式，发掘出诸如“城市规划和河流规划”、“城市自然化”这类在艺术与环境、城市发展、环境的建设共存等方面的文化和社会维度，是反思，也是展望。期待驻留艺术家用自己所擅长的艺术语言，结合驻留地的社会区域性、地域性的实际问题，以艺术的方式向观众呈现。
关键词：洪水、河流、艺术与环境、城市与环境、公共艺术、可持续建设


## 四、驻留艺术家遴选
关于驻留艺术家的遴选工作，将由“中国驻意大利佛罗伦萨驻留计划项目学术委员会”（以下简称为：中方学术委员会），以及“意大利驻中国北京驻留计划学术委员会”（以下简称为：意方学术委员会）联合审核执行。
中方学术委员会由中国国家当代艺术档案库主任、著名艺术家方力钧先生，中国国家当代艺术档案库理事长、著名艺术家王艺先生，中国国家当代艺术档案库秘书长、腾业控股集团董事长、著名收藏家丁大立先生组成。
中方学术委员会将从申报艺术家中初步确定首批入选的15位驻留艺术家，并将初步入围的15人名单转交给意方，再由意方学术委员会进行二次筛选，最终确定3位中方驻留艺术家，申请驻留艺术家初选15人名单将在北京时间2018年3月4日公布，首批意大利佛罗伦萨驻留计划时间为2018年4月2日至4月30日（驻留为期一个月）。
驻留艺术家遴选将面向社会，公平公开接受广大青年艺术家申请，欢迎青年艺术家的参与。

## 五、资助办法
（一）资助名额
2018年，总计划 6名，中、意双方各派3名。
     （二）资助办法
1. 为驻留艺术家提供创作工作室（佛罗伦萨Le Murate 艺术中心提供）。
2. 艺术家驻留期间，为其资助提供创作经费及生活补贴，共计2000欧元/每人，并提供往返机票和住宿（住宿由佛罗伦萨市政府提供）。
3. 驻留期间双方将通过举办学术沙龙、定期与艺术机构组织学术交流、积极为驻留艺术家搭建成长平台，并在驻留结束后为驻留艺术家举办一次驻留群展。
4. 驻留艺术家驻留结束时，需总结汇报驻留期间的学术创作成果，每位艺术家通过协议，由中方项目学术委员会从驻留群展中选取一件作品无偿捐赠驻留地。

## 六、申报程序
1. 申请驻留项目的艺术家，需提供：
    ① 艺术家个人简历
    ② 个人作品集（20/45页）
    ③ 为本次驻留创作主题所制定的创作方案。
注：申请表、个人简历、个人作品集、本次创作主题方案，均需中英文双语。
2. 下载并填写驻留计划申请表（填写完整后，需保存为PDF格式发送至中艺国际艺术中心邮箱，邮箱地址 info@zhongart.it ）,申请邮件需注明：2018中国艺术家赴意大利佛罗伦萨驻留计划。
3. 报名日期截止日期：2018年2月28日北京时间12时（以电子邮件发送时间为准）。


## 七、注意事项、考核与退出
1. 组织方将向驻留艺术家提供签证往返机票开销、住宿、创作空间、基本交通、以及每人2000欧元的生活和创作材料补贴，
2. 驻留艺术家接受驻留主办方日常管理、学术委员会定期随访。
3. 驻留期间，因各种原因无故退出者，须提交退出申请，并完清各项手续，资助费用（往返机票费用、生活创作材料补贴）须全额退还。
《2018中国青年艺术家赴意大利佛罗伦萨驻留计划》由国家当代艺术档案库主任、著名艺术家方力钧先生，中国国家当代艺术档案库理事长、著名艺术家王艺先生和中国国家当代艺术档案库秘书长、腾业控股集团董事长、著名收藏家丁大立先生支持。

主办单位及艺术机构：
佛罗伦萨市政府
        腾业控股集团
时代美术馆
中国国家当代艺术档案库
中国国家画院文化产业研究中心
Le Murate 当代艺术中心
中艺国际文化艺术中心`}
            {/*md`${this.props.content[language]}`*/}







          </div>






        </div>








        <NoSSR>
            <Nav show_on_init = {!is_landscape}/>
        </NoSSR>

        <Resizer/>

      </main>
      )
}
}





const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,

    // device:state.Root.device,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    switchLanguage: bindActionCreators(switchLanguage, dispatch),
    onDevice: bindActionCreators(onDevice, dispatch),
    // setBrowser: bindActionCreators(setBrowser, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(News)
