import { zhHant } from 'vuetify/locale'

export default {
  $vuetify: zhHant,
  nav: {
    home: '首頁',
    explore: '探索',
    about: '關於我們',
    settings: '設定',
    language: '語言',
    zhHant: '中文',
    en: '英文',
    theme: '主題',
    lightTheme: '淺色主題',
    darkTheme: '深色主題',
    login: '登入',
    register: '註冊',
    logout: '登出',
    myWorkSpace: '我的空間',
    myDashboards: '我的儀錶板',
    myDataSets: '我的資料集',
    myPage: '我的個人頁',
    linkData: '連結資料',
    editDashboard: '儀錶板編輯',
    previewDashboard: '儀錶板預覽',
    saveAndBack: '保存並返回',
  },
  footer: {
    slogan: '讓數據說話，讓創意發光',
    link: '連結',
    home: '首頁',
    explore: '探索',
    about: '關於我們',
    contact: '聯絡我們',
    policy: '政策',
    termsOfService: '服務條款',
    privacyPolicy: '隱私政策',
  },
  home: {
    mainHeadline: '發現數據之美，',
    mainHeadline2: '分享你的視覺化作品',
    Subheadline:
      '用最直覺的方式，將數據轉化為生動的視覺化作品，讓你的想法一目了然，與全球創作者一同探索數據的無限可能！',
    getStarted: '立即開始',
    introductionTitle: '讓複雜數據變得簡單易懂',
    introductionData: '管理資料',
    introductionDataText:
      '管理您的資料，無論是上傳、編輯或刪除。我們提供簡單直觀的介面，讓您輕鬆掌控每一份資料。',
    introductionLinkData: '連結資料',
    introductionLinkDataText: '連結您上傳的資料',
    introductionDashboard: '視覺化儀錶板',
    introductionDashboardText:
      '利用我們的視覺化儀錶板，將資料轉換成直觀的圖表與報表。您可以根據需求自訂儀錶板，輕鬆呈現數據趨勢',
    introductionPublic: '公開',
    introductionPublicText:
      '當您的資料視覺化作品完成後，您可以選擇將其公開，讓全球的使用者可以查看與互動。',
    highlightsTitle: '熱門視覺化作品',
  },
  login: {
    login: '登入',
    success: '登入成功',
    firstUse: '第一次使用 DataViz？',
    register: '註冊',
  },
  register: {
    register: '註冊',
    success: '註冊成功',
    notFirstUse: '已經有帳號了？',
    login: '登入',
  },
  logout: {
    success: '登出成功',
  },
  user: {
    account: '帳號',
    userName: '用戶名稱',
    email: '信箱',
    password: '密碼',
    passwordConfirm: '確認密碼',
  },
  explore: {
    popular: '最熱門',
    new: '最新',
    good: '最多讚',
    titleOrAuthor: '標題或作者',
    author: '作者',
    details: '詳細資訊',
    updatedAt: '最後更新',
  },
  auth: {
    myDashboards: '我的儀錶板',
    myDataSets: '我的資料集',
  },
  dataSet: {
    new: '資料集上傳',
    dataName: '資料集名稱',
    dataInfo: '資料集描述',
    createdAt: '建立時間',
    edit: '編輯',
    delete: '刪除',
    upload: '上傳',
    cancel: '取消',
    uploadSuccess: '上傳成功',
    deleteSuccess: '刪除成功',
  },
  fileAgent: {
    helpText: '點擊或拖曳json檔至此',
    errorType: '檔案類型錯誤',
    errorSize: '檔案大小超過限制',
  },
  fileReader: {
    array: 'JSON 格式錯誤：最外層必須是陣列',
    object: 'JSON 格式錯誤：陣列內的元素必須是物件',
    nested: 'JSON 格式錯誤：物件內部不可有巢狀結構',
    fail: '檔案讀取失敗',
  },
  dashboard: {
    new: '建立儀錶板',
    edit: '編輯',
    delete: '刪除',
    deleteSuccess: '刪除成功',
    updatedAt: '最後更新',
  },
  userPage: {
    userEdit: '編輯個人資訊',
    userName: '用戶名稱',
    userInfo: '用戶簡介',
    editSuccess: '編輯成功',
    confirm: '確定',
    uploadAvatar: '上傳頭像',
    upload: '上傳',
    cancel: '取消',
    uplaodSuccess: '上傳成功',
    avatar: '需上傳頭像',
    helpText: '點擊或拖曳圖片檔至此',
  },
  editor: {
    linkData: '連結資料',
    editDashboard: '儀錶板編輯',
    previewDashboard: '儀錶板預覽',
  },
  linkData: {
    newRow: '新增單筆資料',
    newCol: '新增欄位',
    editDataInfo: '編輯資料集資訊',
    new: '資料集上傳',
    linkDataSelect: '選擇連結資料集',
    linkDataSuccess: '連結資料集成功',
    save: '保存修改',
    saveDataSuccess: '保存資料成功',
    editSuccess: '修改資訊成功',
    edit: '修改',
  },
  editDashboard: {
    edit: '編輯儀錶板資訊',
    dashboardName: '儀錶板名稱',
    dashboardInfo: '儀錶板資訊',
    public: '公開',
    cancel: '取消',
    save: '保存修改',
    backgroundColor: '背景色',
    saveSuccess: '保存成功',
    dataChart: '資料圖表',
    barChart: '長條圖',
    lineChart: '折線圖',
    histogram: '直方圖',
    areaChart: '面積圖',
    scatterChart: '散佈圖',
    bubbleChart: '氣泡圖',
    donutChart: '環圈圖',
    pieChart: '圓餅圖',
    polarAreaChart: '極區圖',
    radarChart: '雷達圖',
    statistics: '統計量',
    mean: '平均數',
    median: '中位數',
    mode: '眾數',
    range: '全距',
    IQR: '四分位距',
    variance: '變異數',
    standardDeviation: '標準差',
    dataFilter: '篩選器',
    categoryFilter: '類別',
    rangeFilter: '範圍',
    textAndShape: '文字和形狀',
    textbox: '文字方塊',
    rectangle: '矩形',
    circle: '圓形',
    triangle: '三角形',
    chartTitle: '標題',
    variables1: '變量1',
    variables2: '變量2',
    variables3: '變量3',
    all: '全選',
  },
  editDrawer: {
    customOptions: '使用者自訂選項',
    typography: '文字與樣式設定',
    barChart: '長條圖設定',
    histogram: '直方圖設定',
    lineChart: '折線圖設定',
    areaChart: '面積圖設定',
    scatterChart: '散佈圖設定',
    bubbleChart: '氣泡圖設定',
    pieChart: '圓餅圖設定',
    donutChart: '環圈圖設定',
    polarAreaChart: '極區圖設定',
    radarChart: '雷達圖設定',
    title: '圖表標題設定',
    label: '標籤設定',
    chartTitle: '圖表標題設定',
    chartPosX: '圖表X位置',
    chartPosY: '圖表Y位置',
    chartWidth: '圖表寬度',
    chartHeight: '圖表高度',
    fontSize: '內容字體大小',
    color: '內容文字顏色',
    backgroundColor: '背景顏色',
    borderColor: '邊框顏色',
    padding: '內邊距',
    left: '左',
    right: '右',
    top: '上',
    bottom: '下',
    indexAxis: '方向',
    barColor: '長條圖顏色',
    barBorderWidth: '長條圖邊框寬度',
    barBorderColor: '長條圖邊框顏色',
    barBorderRadius: '長條圖圓角',
    histogramColor: '直方圖顏色',
    histogramBorderWidth: '直方圖邊框寬度',
    histogramBorderColor: '直方圖邊框顏色',
    histogramBorderRadius: '直方圖圓角',
    bins: '區間寬度',
    pointColor: '點顏色',
    pointRadius: '點半徑',
    lineColor: '線顏色',
    lineWidth: '線寬',
    areaColor: '面積顏色',
    pieColor: '圓餅顏色',
    donutColor: '環圈顏色',
    polarAreaColor: '區塊顏色',
    innerText: '內容文字',
    textAlign: '文字對齊',
    textPosition: '文字位置',
    topLeft: '左上',
    topRight: '右上',
    bottomLeft: '左下',
    bottomRight: '右下',
    inflateAmount: '長條圖膨脹比例',
    titleDisplay: '是否顯示標題',
    titlePosition: '標題位置',
    titleAlign: '標題對齊方式',
    titleColor: '標題顏色',
    titleFontWeight: '標題字重',
    titleFontSize: '標題字體大小',
    labelDisplay: '是否顯示標籤',
    scalesXDisplay: '顯示水平軸名稱',
    scalesYDisplay: '顯示垂直軸名稱',
    labelPosition: '標籤位置',
    labelAlign: '標籤對齊方式',
    labelBoxWidth: '標籤寬度',
    labelBoxHeight: '標籤高度',
    labelMaxHeight: '標籤最大高度',
    labelMaxWidth: '標籤最大寬度',
    labelColor: '標籤顏色',
    round: '取小數位',
  },
  api: {
    userNotFound: '用戶不存在',
    userAccountRequired: '帳號必填',
    userAccountTooShort: '帳號太短',
    userAccountTooLong: '帳號太長',
    userAccountDuplicate: '帳號重複',
    userAccountInvalid: '帳號只能是字母或數字',
    userPasswordRequired: '密碼必填',
    userPasswordTooShort: '密碼太短',
    userPasswordTooLong: '密碼太長',
    userPasswordIncorrect: '密碼錯誤',
    userPasswordNotMatch: '密碼不符',
    userTokenInvalid: '使用者驗證錯誤',
    userTokenExpired: '登入過期',
    userEmailRequired: '信箱必填',
    userEmailInvalid: '信箱格式不符',
    userEmailDuplicate: '信箱重複',
    userUserNameRequired: '用戶名稱必須',
    userUserNameDuplicate: '用戶名稱重複',
    userIdInvalid: '用戶ID不符',
    userIdRequired: '用戶ID需要',
    userPermissionDenied: '用戶權限不足',
    requestFormatError: '請求格式錯誤',
    uploadFailed: '圖片上傳失敗',
    dataNameRequired: '資料集名稱必填',
    dataRequired: '資料集需上傳',
    dataFormatError: '資料格式錯誤',
    dashboardNameRequired: '儀錶板名稱必填',
    dataSetIdInvalid: '資料集ID不符',
    dataSetNotFound: '資料集不存在',
    dashboardIdInvalid: '儀錶板ID不符',
    dashboardNotFound: '儀錶板不存在',
    chartCategoryRequired: '圖表種類必填',
    chartCategoryInvalid: '圖表種類不符',
    chartPosXRequired: '圖表位置X必填',
    chartPosYRequired: '圖表位置Y必填',
    chartWidthRequired: '圖表寬度必填',
    chartHeightRequired: '圖表高度必填',
    useVariablesRequired: '請選擇變量',
    serverError: '伺服器錯誤',
    unknownError: '未知錯誤',
  },
}
