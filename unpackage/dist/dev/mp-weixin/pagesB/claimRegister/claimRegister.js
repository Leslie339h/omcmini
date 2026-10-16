(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesB/claimRegister/claimRegister"],{

/***/ 699:
/*!*************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/main.js?{"page":"pagesB%2FclaimRegister%2FclaimRegister"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _claimRegister = _interopRequireDefault(__webpack_require__(/*! ./pagesB/claimRegister/claimRegister.vue */ 700));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_claimRegister.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 700:
/*!******************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesB/claimRegister/claimRegister.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./claimRegister.vue?vue&type=template&id=0e87ad28&scoped=true& */ 701);
/* harmony import */ var _claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./claimRegister.vue?vue&type=script&lang=js& */ 703);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _claimRegister_vue_vue_type_style_index_0_id_0e87ad28_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./claimRegister.vue?vue&type=style&index=0&id=0e87ad28&lang=scss&scoped=true& */ 705);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0e87ad28",
  null,
  false,
  _claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pagesB/claimRegister/claimRegister.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 701:
/*!*************************************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesB/claimRegister/claimRegister.vue?vue&type=template&id=0e87ad28&scoped=true& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./claimRegister.vue?vue&type=template&id=0e87ad28&scoped=true& */ 702);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_template_id_0e87ad28_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 702:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesB/claimRegister/claimRegister.vue?vue&type=template&id=0e87ad28&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uPicker: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-picker/u-picker */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-picker/u-picker")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-picker/u-picker.vue */ 859))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.warrantyList.length
  var m0 = _vm.formImg.damage_image
    ? _vm.previewUrl(_vm.formImg.damage_image)
    : null
  var m1 = _vm.formImg.tire_full_image
    ? _vm.previewUrl(_vm.formImg.tire_full_image)
    : null
  var m2 = _vm.previewUrl(_vm.dotExamplePath)
  var m3 = _vm.formImg.sidewall_dot_image
    ? _vm.previewUrl(_vm.formImg.sidewall_dot_image)
    : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.warrantyShow = true
    }
    _vm.e1 = function ($event) {
      _vm.damageShow = true
    }
    _vm.e2 = function ($event) {
      _vm.warrantyShow = false
    }
    _vm.e3 = function ($event) {
      _vm.damageShow = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        m0: m0,
        m1: m1,
        m2: m2,
        m3: m3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 703:
/*!*******************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesB/claimRegister/claimRegister.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./claimRegister.vue?vue&type=script&lang=js& */ 704);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 704:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesB/claimRegister/claimRegister.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 55));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 57));
var _config = _interopRequireDefault(__webpack_require__(/*! @/config.js */ 162));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      prefillWarrantyId: '',
      warrantyList: [],
      warranty_id: 0,
      warrantyDisplay: '',
      warrantyShow: false,
      receiver_name: '',
      receiver_mobile: '',
      receive_address: '',
      damage_type: '',
      damageShow: false,
      damageColumns: [['胎侧鼓包', '胎面变形', '胎面扎钉漏气（限自修复胎）', '其他质量问题']],
      beadInfo: {
        bead_code: '',
        pattern_no: '',
        tire_spec: '',
        load_speed: ''
      },
      formImg: {
        damage_image: '',
        tire_full_image: '',
        sidewall_dot_image: ''
      },
      submitting: false,
      dotExamplePath: '/uploads/20260531/f91b4574089f87fb77c6042f891062b4.png'
    };
  },
  computed: {
    warrantyPickerColumns: function warrantyPickerColumns() {
      var col = this.warrantyList.map(function (w) {
        var t = "".concat(w.tire_name || '').trim();
        var remain = w.claim_remain != null ? w.claim_remain : 0;
        var total = w.bead_count != null ? w.bead_count : 0;
        return "\u8D28\u4FDD#".concat(w.id).concat(t ? ' ' + t : '', "\uFF08\u53EF\u7406\u8D54").concat(remain, "/").concat(total, "\uFF09");
      });
      return [col];
    },
    selectedWarranty: function selectedWarranty() {
      var _this = this;
      if (!this.warranty_id) return null;
      return this.warrantyList.find(function (w) {
        return Number(w.id) === Number(_this.warranty_id);
      }) || null;
    },
    beadSummary: function beadSummary() {
      var b = this.beadInfo;
      if (!b.bead_code) return '';
      return [b.bead_code, b.pattern_no, b.tire_spec, b.load_speed].filter(Boolean).join('  ');
    }
  },
  onLoad: function onLoad(options) {
    if (options && options.warranty_id) {
      this.prefillWarrantyId = String(options.warranty_id);
    }
    this.loadClaimOptions();
    if (this.vuex_user && this.vuex_user.mobile) {
      this.receiver_mobile = String(this.vuex_user.mobile);
    }
    this.loadWarranties();
    this.initLocationForAddress();
  },
  methods: {
    initLocationForAddress: function initLocationForAddress() {
      uni.getLocation({
        type: 'gcj02',
        success: function success(loc) {
          uni.setStorageSync('address', {
            latitude: loc.latitude,
            longitude: loc.longitude
          });
        },
        fail: function fail() {}
      });
    },
    pickReceiveAddress: function pickReceiveAddress() {
      var _this2 = this;
      uni.chooseLocation({
        success: function success(res) {
          var parts = [res.address, res.name].filter(function (s) {
            return s && String(s).trim();
          });
          _this2.receive_address = parts.join(' ');
        }
      });
    },
    goWarranty: function goWarranty() {
      uni.navigateTo({
        url: '/pagesB/warrantyRegister/warrantyRegister'
      });
    },
    loadClaimOptions: function loadClaimOptions() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this3.claimOptions({});
              case 2:
                res = _context.sent;
                if (res.code === 1 && res.data && res.data.damage_types && res.data.damage_types.length) {
                  _this3.damageColumns = [res.data.damage_types];
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    loadWarranties: function loadWarranties() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this4.warrantyMyList({});
              case 2:
                res = _context2.sent;
                if (res.code === 1 && res.data && res.data.list) {
                  _this4.warrantyList = res.data.list;
                  _this4.$nextTick(function () {
                    return _this4.applyPrefillWarranty();
                  });
                }
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    applyPrefillWarranty: function applyPrefillWarranty() {
      if (!this.prefillWarrantyId || this.warrantyList.length === 0) return;
      var id = Number(this.prefillWarrantyId);
      var idx = this.warrantyList.findIndex(function (w) {
        return Number(w.id) === id;
      });
      if (idx >= 0) {
        this.warranty_id = id;
        var col = this.warrantyPickerColumns[0];
        this.warrantyDisplay = col[idx] || '';
      }
    },
    onWarrantyConfirm: function onWarrantyConfirm(e) {
      var idx = e.indexs[0];
      var w = this.warrantyList[idx];
      if (w) {
        this.warranty_id = Number(w.id);
        this.warrantyDisplay = e.value && e.value[0] ? e.value[0] : '';
        // 切换质保后清空已扫子口码，避免串单
        this.resetBead();
      }
      this.warrantyShow = false;
    },
    resetBead: function resetBead() {
      this.beadInfo = {
        bead_code: '',
        pattern_no: '',
        tire_spec: '',
        load_speed: ''
      };
    },
    onDamageConfirm: function onDamageConfirm(e) {
      var v = e.value && e.value[0];
      this.damage_type = v || '';
      this.damageShow = false;
    },
    scanBead: function scanBead() {
      var _this5 = this;
      if (this.warrantyList.length > 0 && !this.warranty_id) {
        return this.showToast('请先选择关联质保记录');
      }
      var w = this.selectedWarranty;
      if (w && (w.claim_remain || 0) <= 0) {
        return this.showToast('该质保登记理赔次数已达上限');
      }
      uni.scanCode({
        onlyFromCamera: false,
        scanType: ['barCode', 'qrCode'],
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(res) {
            var code, q;
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    code = String(res.result || '').trim();
                    if (code) {
                      _context3.next = 3;
                      break;
                    }
                    return _context3.abrupt("return", _this5.showToast('未识别到编码'));
                  case 3:
                    if (!w) {
                      _context3.next = 8;
                      break;
                    }
                    if (!(!Array.isArray(w.beads) || !w.beads.length)) {
                      _context3.next = 6;
                      break;
                    }
                    return _context3.abrupt("return", _this5.showToast('该质保登记未绑定子口码，无法理赔'));
                  case 6:
                    if (!(w.beads.indexOf(code) < 0)) {
                      _context3.next = 8;
                      break;
                    }
                    return _context3.abrupt("return", _this5.showToast('该子口码不在所选质保的注册信息中，无法添加'));
                  case 8:
                    if (!(w && Array.isArray(w.claimed_beads) && w.claimed_beads.indexOf(code) >= 0)) {
                      _context3.next = 10;
                      break;
                    }
                    return _context3.abrupt("return", _this5.showToast('该子口码已提交过理赔'));
                  case 10:
                    uni.showLoading({
                      title: '查询中'
                    });
                    _context3.prev = 11;
                    _context3.next = 14;
                    return _this5.tirebeadQuery({
                      bead_code: code
                    });
                  case 14:
                    q = _context3.sent;
                    uni.hideLoading();
                    if (!(q.code !== 1 || !q.data)) {
                      _context3.next = 18;
                      break;
                    }
                    return _context3.abrupt("return", _this5.showToast(q && q.msg || '未匹配到该子口码'));
                  case 18:
                    _this5.beadInfo = {
                      bead_code: String(q.data.bead_code || code),
                      pattern_no: String(q.data.pattern_no || ''),
                      tire_spec: String(q.data.tire_spec || ''),
                      load_speed: String(q.data.load_speed || '')
                    };
                    _this5.showToast('识别成功');
                    _context3.next = 26;
                    break;
                  case 22:
                    _context3.prev = 22;
                    _context3.t0 = _context3["catch"](11);
                    uni.hideLoading();
                    _this5.showToast('查询失败');
                  case 26:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, null, [[11, 22]]);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }(),
        fail: function fail(err) {
          var msg = err && (err.errMsg || err.message) || '';
          if (/cancel/i.test(msg)) return;
          _this5.showToast(msg ? '扫码失败：' + msg : '扫码失败，请用真机重试');
        }
      });
    },
    previewSample: function previewSample(path) {
      var u = this.previewUrl(path);
      if (!u) return;
      uni.previewImage({
        urls: [u],
        current: u
      });
    },
    previewUrl: function previewUrl(path) {
      if (!path) return '';
      if (path.indexOf('http') === 0) return path;
      var base = _config.default.serverIp.replace(/\/?$/, '');
      var p = path.startsWith('/') ? path : '/' + path;
      return base + p;
    },
    pickImage: function pickImage(key) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var ch, msg, tempPath, res, imageUrl, _msg;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _this6.chooseImage(1);
              case 3:
                ch = _context4.sent;
                _context4.next = 11;
                break;
              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                msg = _context4.t0 && (_context4.t0.errMsg || _context4.t0.message) || '';
                if (!/cancel/i.test(msg)) {
                  _this6.showToast(msg || '无法打开相册，请检查微信照片权限');
                }
                return _context4.abrupt("return");
              case 11:
                tempPath = ch && ch.tempFilePaths && ch.tempFilePaths[0];
                if (tempPath) {
                  _context4.next = 15;
                  break;
                }
                _this6.showToast('未获取到图片，请重新选择');
                return _context4.abrupt("return");
              case 15:
                uni.showLoading({
                  title: '上传中',
                  mask: true
                });
                _context4.prev = 16;
                _context4.next = 19;
                return _this6.uploadImg(tempPath);
              case 19:
                res = _context4.sent;
                if (!(res.code === 1 && res.data)) {
                  _context4.next = 25;
                  break;
                }
                imageUrl = typeof res.data === 'string' ? res.data : res.data.url || '';
                if (!imageUrl) {
                  _context4.next = 25;
                  break;
                }
                _this6.$set(_this6.formImg, key, imageUrl);
                return _context4.abrupt("return");
              case 25:
                if (!(Number(res && res.code) === 401)) {
                  _context4.next = 28;
                  break;
                }
                _this6.showToast('登录已失效，请重新登录');
                return _context4.abrupt("return");
              case 28:
                _this6.showToast(res && res.msg || '图片上传失败');
                _context4.next = 35;
                break;
              case 31:
                _context4.prev = 31;
                _context4.t1 = _context4["catch"](16);
                _msg = _context4.t1 && (_context4.t1.errMsg || _context4.t1.message) || '';
                _this6.showToast(_msg || '图片上传失败，请检查网络后重试');
              case 35:
                _context4.prev = 35;
                uni.hideLoading();
                return _context4.finish(35);
              case 38:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 6], [16, 31, 35, 38]]);
      }))();
    },
    submit: function submit() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var payload, res;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!_this7.submitting) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                if (!(_this7.warrantyList.length > 0 && !_this7.warranty_id)) {
                  _context5.next = 4;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请选择关联质保记录'));
              case 4:
                if (_this7.beadInfo.bead_code) {
                  _context5.next = 6;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请扫描子口码'));
              case 6:
                if (_this7.receiver_name.trim()) {
                  _context5.next = 8;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请填写收货人'));
              case 8:
                if (/^1\d{10}$/.test(_this7.receiver_mobile)) {
                  _context5.next = 10;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请填写正确联系电话'));
              case 10:
                if (_this7.receive_address.trim()) {
                  _context5.next = 12;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请选择收货地址'));
              case 12:
                if (_this7.damage_type) {
                  _context5.next = 14;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请选择损伤类型'));
              case 14:
                if (_this7.formImg.damage_image) {
                  _context5.next = 16;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请上传损伤/鼓包局部图'));
              case 16:
                if (_this7.formImg.tire_full_image) {
                  _context5.next = 18;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请上传轮胎整体图'));
              case 18:
                if (_this7.formImg.sidewall_dot_image) {
                  _context5.next = 20;
                  break;
                }
                return _context5.abrupt("return", _this7.showToast('请上传胎侧 DOT 图'));
              case 20:
                _this7.submitting = true;
                payload = {
                  warranty_id: _this7.warranty_id || 0,
                  bead_code: _this7.beadInfo.bead_code,
                  pattern_no: _this7.beadInfo.pattern_no,
                  tire_spec: _this7.beadInfo.tire_spec,
                  load_speed: _this7.beadInfo.load_speed,
                  receiver_name: _this7.receiver_name.trim(),
                  receiver_mobile: _this7.receiver_mobile.trim(),
                  receive_address: _this7.receive_address.trim(),
                  damage_type: _this7.damage_type,
                  damage_image: _this7.formImg.damage_image,
                  tire_full_image: _this7.formImg.tire_full_image,
                  sidewall_dot_image: _this7.formImg.sidewall_dot_image
                };
                _context5.prev = 22;
                _context5.next = 25;
                return _this7.claimSubmit(payload);
              case 25:
                res = _context5.sent;
                if (res.code === 1) {
                  _this7.showToast('提交成功');
                  setTimeout(function () {
                    if (_this7.warranty_id) {
                      uni.redirectTo({
                        url: '/pagesB/claimMyList/claimMyList?warranty_id=' + _this7.warranty_id
                      });
                      return;
                    }
                    uni.navigateBack({
                      fail: function fail() {
                        return uni.switchTab({
                          url: '/pages/my/my'
                        });
                      }
                    });
                  }, 600);
                }
              case 27:
                _context5.prev = 27;
                _this7.submitting = false;
                return _context5.finish(27);
              case 30:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[22,, 27, 30]]);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 705:
/*!****************************************************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesB/claimRegister/claimRegister.vue?vue&type=style&index=0&id=0e87ad28&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_style_index_0_id_0e87ad28_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./claimRegister.vue?vue&type=style&index=0&id=0e87ad28&lang=scss&scoped=true& */ 706);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_style_index_0_id_0e87ad28_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_style_index_0_id_0e87ad28_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_style_index_0_id_0e87ad28_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_style_index_0_id_0e87ad28_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_claimRegister_vue_vue_type_style_index_0_id_0e87ad28_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 706:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesB/claimRegister/claimRegister.vue?vue&type=style&index=0&id=0e87ad28&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[699,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesB/claimRegister/claimRegister.js.map