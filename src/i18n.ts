import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: {
    nav:{home:'Home',about:'About Us',products:'Products',services:'Services',why:'Why Us',contact:'Contact'},
    common:{eyebrow:'Import  |  Export  |  Global Trade',tagline:'Global Sourcing & Manufacturing Partner',explore:'Explore',learn:'Learn more',enquire:'Enquire on WhatsApp',getInTouch:'Get in Touch',viewAll:'View all categories'},
    hero:{titleA:'Connecting Businesses',titleB:'Across the Globe',body:'We source, supply and deliver the products you need from trusted manufacturers around the world.',quality:'Quality Products',prices:'Competitive Prices',suppliers:'Reliable Suppliers',shipping:'Worldwide Shipping',services:'Explore Our Services'},
    products:{kicker:'Our product categories',titleA:'Wide Range.',titleB:'Endless Possibilities.',body:'From everyday essentials to industrial solutions, we source a diverse range of products to meet your business needs.'},
    services:{kicker:'Our services',title:'Your Success, Our Support',body:'From finding the right suppliers to delivering your products worldwide, we handle the process so you can focus on growing your business.'},
    about:{kicker:'UJR TradeSource',title:'Your Global Trade Partner',body:'UJR TradeSource International helps businesses identify products, coordinate manufacturing and manage the path from supplier to global delivery.'},
    why:{title:'Why Choose Us?',items:['Wide product category coverage','Reliable supplier sourcing','Competitive pricing','Quality inspection and order verification','Flexible OEM / ODM solutions','International logistics coordination']},
    world:{title:'From China to Worldwide',body:'We connect opportunities across Africa, Europe, the USA, GCC, Central Asia and beyond.'},
    portfolio:{kicker:'Featured products',title:'Our Product Portfolio'},
    social:{title:'Follow Us & Stay Connected',body:'Get the latest updates, new products and global trade insights.',enquiry:'Send Us an Enquiry',enquiryBody:'We are here to help. Tell us what you need and our team will get back to you.',button:'Send Enquiry'},
    footer:{quick:'Quick Links',contact:'Contact Us',locations:'Locations',privacy:'Privacy Policy',terms:'Terms & Conditions',rights:'All rights reserved.'},
    language:{title:'Display language',hint:'Choose the language used across the website.',primary:'Primary'},
    detail:{subcategories:'Available subcategories',needHelp:'Need help sourcing this category?',back:'Back to all categories'},
    notFound:{title:'Page not found',body:'The page you requested could not be found.',home:'Return home'}
  }},
  zh: { translation: {
    nav:{home:'首页',about:'关于我们',products:'产品',services:'服务',why:'选择我们',contact:'联系我们'},
    common:{eyebrow:'进口  |  出口  |  全球贸易',tagline:'全球采购与制造合作伙伴',explore:'查看',learn:'了解更多',enquire:'WhatsApp 咨询',getInTouch:'联系我们',viewAll:'查看所有类别'},
    hero:{titleA:'连接商业机遇',titleB:'通达全球市场',body:'我们从全球可信赖的制造商处为您采购、供应并交付所需产品。',quality:'优质产品',prices:'有竞争力的价格',suppliers:'可靠供应商',shipping:'全球运输',services:'探索我们的服务'},
    products:{kicker:'产品类别',titleA:'品类丰富，',titleB:'无限可能。',body:'从日常用品到工业解决方案，我们采购多样化产品，满足您的业务需求。'},
    services:{kicker:'我们的服务',title:'助力您的成功',body:'从寻找合适供应商到将产品运往全球，我们全程协调，让您专注业务增长。'},
    about:{kicker:'UJR TradeSource',title:'您的全球贸易伙伴',body:'UJR TradeSource International 帮助企业寻找产品、协调制造，并管理从供应商到全球交付的全过程。'},
    why:{title:'为什么选择我们？',items:['广泛的产品类别','可靠的供应商采购','有竞争力的价格','质量检验与订单核验','灵活的 OEM / ODM 方案','国际物流协调']},
    world:{title:'从中国走向世界',body:'我们连接非洲、欧洲、美国、海湾地区、中亚及更多市场的机遇。'},
    portfolio:{kicker:'精选产品',title:'我们的产品组合'},
    social:{title:'关注我们，保持联系',body:'获取最新动态、新产品与全球贸易资讯。',enquiry:'发送咨询',enquiryBody:'告诉我们您的需求，我们的团队将与您联系。',button:'发送咨询'},
    footer:{quick:'快速链接',contact:'联系方式',locations:'办公地点',privacy:'隐私政策',terms:'条款与条件',rights:'版权所有。'},
    language:{title:'显示语言',hint:'选择网站使用的显示语言。',primary:'主要语言'},
    detail:{subcategories:'可提供的子类别',needHelp:'需要采购此类别吗？',back:'返回所有类别'},
    notFound:{title:'页面未找到',body:'找不到您请求的页面。',home:'返回首页'}
  }},
  ar: { translation: {
    nav:{home:'الرئيسية',about:'من نحن',products:'المنتجات',services:'الخدمات',why:'لماذا نحن',contact:'اتصل بنا'},
    common:{eyebrow:'استيراد  |  تصدير  |  تجارة عالمية',tagline:'شريكك في التوريد والتصنيع العالمي',explore:'استكشف',learn:'اعرف المزيد',enquire:'استفسر عبر واتساب',getInTouch:'تواصل معنا',viewAll:'عرض كل الفئات'},
    hero:{titleA:'نربط الأعمال',titleB:'حول العالم',body:'نقوم بتوريد وتسليم المنتجات التي تحتاجها من مصنّعين موثوقين حول العالم.',quality:'منتجات عالية الجودة',prices:'أسعار تنافسية',suppliers:'مورّدون موثوقون',shipping:'شحن عالمي',services:'استكشف خدماتنا'},
    products:{kicker:'فئات منتجاتنا',titleA:'تنوع واسع.',titleB:'إمكانات بلا حدود.',body:'من الاحتياجات اليومية إلى الحلول الصناعية، نوفر مجموعة متنوعة تلبي احتياجات أعمالك.'},
    services:{kicker:'خدماتنا',title:'نجاحك، دعمنا',body:'من العثور على المورّد المناسب إلى تسليم منتجاتك عالمياً، ندير العملية لتتفرغ لنمو أعمالك.'},
    about:{kicker:'UJR TradeSource',title:'شريكك في التجارة العالمية',body:'تساعد UJR TradeSource International الشركات في تحديد المنتجات وتنسيق التصنيع وإدارة الرحلة من المورّد إلى التسليم العالمي.'},
    why:{title:'لماذا تختارنا؟',items:['تغطية واسعة لفئات المنتجات','توريد موثوق من الموردين','أسعار تنافسية','فحص الجودة والتحقق من الطلبات','حلول OEM / ODM مرنة','تنسيق الخدمات اللوجستية الدولية']},
    world:{title:'من الصين إلى العالم',body:'نربط الفرص عبر أفريقيا وأوروبا والولايات المتحدة ودول الخليج وآسيا الوسطى وما بعدها.'},
    portfolio:{kicker:'منتجات مختارة',title:'مجموعة منتجاتنا'},
    social:{title:'تابعنا وابقَ على تواصل',body:'احصل على آخر الأخبار والمنتجات الجديدة ورؤى التجارة العالمية.',enquiry:'أرسل استفسارك',enquiryBody:'نحن هنا للمساعدة. أخبرنا بما تحتاج وسيتواصل فريقنا معك.',button:'إرسال استفسار'},
    footer:{quick:'روابط سريعة',contact:'اتصل بنا',locations:'المواقع',privacy:'سياسة الخصوصية',terms:'الشروط والأحكام',rights:'جميع الحقوق محفوظة.'},
    language:{title:'لغة العرض',hint:'اختر اللغة المستخدمة في الموقع.',primary:'الأساسية'},
    detail:{subcategories:'الفئات الفرعية المتاحة',needHelp:'هل تحتاج للمساعدة في توريد هذه الفئة؟',back:'العودة إلى كل الفئات'},
    notFound:{title:'الصفحة غير موجودة',body:'تعذر العثور على الصفحة المطلوبة.',home:'العودة للرئيسية'}
  }}
};

i18n.use(initReactI18next).init({ resources, lng:'en', fallbackLng:'en', interpolation:{escapeValue:false} });
export default i18n;
