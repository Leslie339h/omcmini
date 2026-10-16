(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesB/warrantyRegister/warrantyRegister"],{

/***/ 683:
/*!*******************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/main.js?{"page":"pagesB%2FwarrantyRegister%2FwarrantyRegister"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _warrantyRegister = _interopRequireDefault(__webpack_require__(/*! ./pagesB/warrantyRegister/warrantyRegister.vue */ 684));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_warrantyRegister.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 684:
/*!************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesB/warrantyRegister/warrantyRegister.vue ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warrantyRegister.vue?vue&type=template&id=56a90c68&scoped=true& */ 685);
/* harmony import */ var _warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./warrantyRegister.vue?vue&type=script&lang=js& */ 687);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _warrantyRegister_vue_vue_type_style_index_0_id_56a90c68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./warrantyRegister.vue?vue&type=style&index=0&id=56a90c68&lang=scss&scoped=true& */ 689);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "56a90c68",
  null,
  false,
  _warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pagesB/warrantyRegister/warrantyRegister.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 685:
/*!*******************************************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesB/warrantyRegister/warrantyRegister.vue?vue&type=template&id=56a90c68&scoped=true& ***!
  \*******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./warrantyRegister.vue?vue&type=template&id=56a90c68&scoped=true& */ 686);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_template_id_56a90c68_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 686:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesB/warrantyRegister/warrantyRegister.vue?vue&type=template&id=56a90c68&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var m0 = _vm.previewUrl(_vm.barcodeExamplePath)
  var g0 = _vm.tireTabs.length
  var g1 = _vm.tireTabs.length
  var g2 = _vm.tireTabs.length && _vm.currentTab
  var g3 = g2 ? _vm.tireTabs.length : null
  var m1 = _vm.previewUrl(_vm.vehicleExamplePath)
  var m2 = _vm.formImg.vehicle_install_image
    ? _vm.previewUrl(_vm.formImg.vehicle_install_image)
    : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.channelShow = true
    }
    _vm.e1 = function ($event) {
      _vm.tireTypeShow = true
    }
    _vm.e2 = function ($event) {
      _vm.tireShow = true
    }
    _vm.e3 = function ($event, idx) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        idx = _temp2.idx
      var _temp, _temp2
      _vm.activeTab = idx
    }
    _vm.e4 = function ($event) {
      _vm.channelShow = false
    }
    _vm.e5 = function ($event) {
      _vm.tireTypeShow = false
    }
    _vm.e6 = function ($event) {
      _vm.tireShow = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
        m1: m1,
        m2: m2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 687:
/*!*************************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesB/warrantyRegister/warrantyRegister.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./warrantyRegister.vue?vue&type=script&lang=js& */ 688);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 688:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesB/warrantyRegister/warrantyRegister.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
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
var WarrantyPolicyPopup = function WarrantyPolicyPopup() {
  Promise.all(/*! require.ensure | components/warrantyPolicyPopup/warrantyPolicyPopup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/warrantyPolicyPopup/warrantyPolicyPopup")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/warrantyPolicyPopup/warrantyPolicyPopup.vue */ 1030));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var WarrantyEnvelopePopup = function WarrantyEnvelopePopup() {
  __webpack_require__.e(/*! require.ensure | components/warrantyEnvelopePopup/warrantyEnvelopePopup */ "components/warrantyEnvelopePopup/warrantyEnvelopePopup").then((function () {
    return resolve(__webpack_require__(/*! @/components/warrantyEnvelopePopup/warrantyEnvelopePopup.vue */ 1037));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
function emptyBead() {
  return {
    bead_code: '',
    pattern_no: '',
    tire_spec: '',
    load_speed: '',
    year_week: ''
  };
}
var _default = {
  components: {
    WarrantyPolicyPopup: WarrantyPolicyPopup,
    WarrantyEnvelopePopup: WarrantyEnvelopePopup
  },
  data: function data() {
    return {
      showWarrantyPolicy: false,
      showEnvelope: false,
      salutation: '',
      mobile: '',
      purchase_channel: '',
      purchase_city: '',
      delivery_address: '',
      vehicle_type: '',
      vehicleTypeOptions: ['新能源车', '燃油车'],
      tire_type: '',
      tire_name: '',
      formImg: {
        vehicle_install_image: ''
      },
      tireTabs: [],
      activeTab: 0,
      channelShow: false,
      tireTypeShow: false,
      tireShow: false,
      channelColumns: [['线下门店', '抖音', '京东', '天猫', '微信视频号']],
      tireTypeColumns: [['自修复轮胎', '普通轮胎']],
      tireColumns: [['Quest-X / 悦驰UHP', 'Journey-X PRO / 悦旅', 'Quest-X SUV / 悦驰SUV', 'Rough Master XT / 静野 XT', 'Rough Master-RT', 'Winter Master D1']],
      submitting: false,
      barcodeExamplePath: '/uploads/20260531/6a8231e89d6d3439c2b13cfdecfcce85.png',
      vehicleExamplePath: '/uploads/20260504/7fa536878d1809e400ecd258bf61cf79.jpg',
      order_no_input: '',
      linked_order_no: '',
      linked_order_id: 0,
      linked_amount_pay: '',
      order_goods_list: [],
      orderLookupLoading: false
    };
  },
  computed: {
    currentTab: function currentTab() {
      if (!this.tireTabs.length) return null;
      var i = Math.min(this.activeTab, this.tireTabs.length - 1);
      return this.tireTabs[i];
    }
  },
  onLoad: function onLoad() {
    if (!this.ensureLoggedIn()) return;
    this.loadOptions();
    if (this.vuex_user) {
      if (this.vuex_user.mobile) this.mobile = String(this.vuex_user.mobile);
    }
    this.initLocationForAddress();
  },
  onShow: function onShow() {
    if (!this.ensureLoggedIn()) return;
    this.checkWarrantyPolicy();
  },
  methods: {
    toHome: function toHome() {
      uni.navigateBack({
        fail: function fail() {
          return uni.switchTab({
            url: '/pages/my/my'
          });
        }
      });
    },
    onVehicleTypeChange: function onVehicleTypeChange(e) {
      this.vehicle_type = e.detail.value;
    },
    ensureLoggedIn: function ensureLoggedIn() {
      if (uni.getStorageSync('token')) return true;
      uni.reLaunch({
        url: '/pages/login/login'
      });
      return false;
    },
    checkWarrantyPolicy: function checkWarrantyPolicy() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var token, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = uni.getStorageSync('token');
                if (token) {
                  _context.next = 4;
                  break;
                }
                _this.showWarrantyPolicy = false;
                return _context.abrupt("return");
              case 4:
                _context.prev = 4;
                _context.next = 7;
                return _this.userInfo({});
              case 7:
                res = _context.sent;
                if (res.code === 1 && res.data && parseInt(res.data.need_warranty_policy, 10) === 1) {
                  _this.showWarrantyPolicy = true;
                }
                _context.next = 13;
                break;
              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }))();
    },
    onWarrantyPolicyConfirmed: function onWarrantyPolicyConfirmed() {
      this.showWarrantyPolicy = false;
      var user = uni.getStorageSync('user') || {};
      user.need_warranty_policy = 0;
      uni.setStorageSync('user', user);
    },
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
    pickDeliveryAddress: function pickDeliveryAddress() {
      var _this2 = this;
      uni.chooseLocation({
        success: function success(res) {
          var parts = [res.address, res.name].filter(function (s) {
            return s && String(s).trim();
          });
          _this2.delivery_address = parts.join(' ');
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
    loadOptions: function loadOptions() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this3.warrantyOptions({});
              case 2:
                res = _context2.sent;
                if (res.code === 1 && res.data) {
                  if (res.data.purchase_channels && res.data.purchase_channels.length) {
                    _this3.channelColumns = [res.data.purchase_channels];
                  }
                  if (res.data.tire_types && res.data.tire_types.length) {
                    _this3.tireTypeColumns = [res.data.tire_types];
                  }
                  if (res.data.tire_names && res.data.tire_names.length) {
                    _this3.tireColumns = [res.data.tire_names];
                  }
                }
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    applyPrefill: function applyPrefill(p) {
      if (!p || (0, _typeof2.default)(p) !== 'object') return;
      if (p.salutation && !this.salutation.trim()) this.salutation = String(p.salutation);
      if (p.mobile && /^1\d{10}$/.test(String(p.mobile)) && !/^1\d{10}$/.test(this.mobile)) {
        this.mobile = String(p.mobile);
      }
      if (p.purchase_city && !this.purchase_city.trim()) this.purchase_city = String(p.purchase_city);
      if (p.delivery_address && !this.delivery_address.trim()) this.delivery_address = String(p.delivery_address);
      if (p.purchase_channel && this.channelColumns[0] && this.channelColumns[0].indexOf(p.purchase_channel) >= 0) {
        if (!this.purchase_channel) this.purchase_channel = String(p.purchase_channel);
      }
      if (p.tire_type && this.tireTypeColumns[0] && this.tireTypeColumns[0].indexOf(p.tire_type) >= 0) {
        if (!this.tire_type) this.tire_type = String(p.tire_type);
      }
      if (p.tire_name && this.tireColumns[0] && this.tireColumns[0].indexOf(p.tire_name) >= 0) {
        if (!this.tire_name) this.tire_name = String(p.tire_name);
      }
    },
    loadOrderGoods: function loadOrderGoods() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var no, res;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                no = String(_this4.order_no_input || '').trim();
                if (no) {
                  _context3.next = 3;
                  break;
                }
                return _context3.abrupt("return", _this4.showToast('请先输入订单号'));
              case 3:
                if (!_this4.orderLookupLoading) {
                  _context3.next = 5;
                  break;
                }
                return _context3.abrupt("return");
              case 5:
                _this4.orderLookupLoading = true;
                _context3.prev = 6;
                _context3.next = 9;
                return _this4.warrantyOrderGoods({
                  order_no: no
                });
              case 9:
                res = _context3.sent;
                if (!(res.code !== 1 || !res.data)) {
                  _context3.next = 12;
                  break;
                }
                return _context3.abrupt("return");
              case 12:
                _this4.linked_order_no = res.data.order_no || '';
                _this4.linked_order_id = res.data.order_id || 0;
                _this4.linked_amount_pay = res.data.amount_pay != null ? String(res.data.amount_pay) : '';
                _this4.order_goods_list = Array.isArray(res.data.goods_list) ? res.data.goods_list : [];
                _this4.applyPrefill(res.data.prefill);
                _this4.showToast('已载入订单商品');
              case 18:
                _context3.prev = 18;
                _this4.orderLookupLoading = false;
                return _context3.finish(18);
              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[6,, 18, 21]]);
      }))();
    },
    onChannelConfirm: function onChannelConfirm(e) {
      var v = e.value && e.value[0];
      this.purchase_channel = v || '';
      this.channelShow = false;
    },
    onTireTypeConfirm: function onTireTypeConfirm(e) {
      var v = e.value && e.value[0];
      this.tire_type = v || '';
      this.tireTypeShow = false;
    },
    onTireConfirm: function onTireConfirm(e) {
      var v = e.value && e.value[0];
      this.tire_name = v || '';
      this.tireShow = false;
    },
    scanAddBead: function scanAddBead() {
      var _this5 = this;
      if (this.tireTabs.length >= 5) {
        return this.showToast('最多绑定5个子口码');
      }
      uni.scanCode({
        onlyFromCamera: false,
        scanType: ['barCode', 'qrCode'],
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(res) {
            var code, exists, used, q, row;
            return _regenerator.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    code = String(res.result || '').trim();
                    if (code) {
                      _context4.next = 3;
                      break;
                    }
                    return _context4.abrupt("return", _this5.showToast('未识别到编码'));
                  case 3:
                    exists = _this5.tireTabs.some(function (t) {
                      return String(t.bead_code) === code;
                    });
                    if (!exists) {
                      _context4.next = 6;
                      break;
                    }
                    return _context4.abrupt("return", _this5.showToast('该子口码已添加'));
                  case 6:
                    uni.showLoading({
                      title: '查询中'
                    });
                    _context4.prev = 7;
                    _context4.next = 10;
                    return _this5.warrantyCheckBead({
                      bead_code: code
                    });
                  case 10:
                    used = _context4.sent;
                    if (!(used.code === 1 && used.data && used.data.used)) {
                      _context4.next = 14;
                      break;
                    }
                    uni.hideLoading();
                    return _context4.abrupt("return", _this5.showToast('该子口码已绑定其他注册，不能重复添加'));
                  case 14:
                    _context4.next = 16;
                    return _this5.tirebeadQuery({
                      bead_code: code
                    });
                  case 16:
                    q = _context4.sent;
                    uni.hideLoading();
                    if (q.code !== 1 || !q.data) {
                      // return this.showToast((q && q.msg) || '未匹配到该子口码')
                    }
                    row = emptyBead();
                    row.bead_code = String(q.data.bead_code || code);
                    row.pattern_no = String(q.data.pattern_no || '');
                    row.tire_spec = String(q.data.tire_spec || '');
                    row.load_speed = String(q.data.load_speed || '');
                    row.year_week = String(q.data.year_week || '');
                    _this5.tireTabs.push(row);
                    _this5.activeTab = _this5.tireTabs.length - 1;
                    if (!_this5.tire_name && row.pattern_no) {
                      _this5.tryMatchTireName(row.pattern_no);
                    }
                    _this5.showToast('已添加轮胎' + _this5.tireTabs.length);
                    _context4.next = 36;
                    break;
                  case 31:
                    _context4.prev = 31;
                    _context4.t0 = _context4["catch"](7);
                    uni.hideLoading();
                    console.log(_context4.t0);
                    _this5.showToast('如果没有新轮胎显示，请重试！');
                  case 36:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, null, [[7, 31]]);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }(),
        fail: function fail(err) {
          var msg = err && (err.errMsg || err.message) || '';
          if (/cancel/i.test(msg)) return;
          // this.showToast(msg ? ('扫码失败：' + msg) : '扫码失败，请用真机重试')
          _this5.showToast('如果没有新轮胎显示，请重试！');
        }
      });
    },
    tryMatchTireName: function tryMatchTireName(patternNo) {
      var list = this.tireColumns && this.tireColumns[0] || [];
      var p = String(patternNo || '');
      for (var i = 0; i < list.length; i++) {
        var name = list[i];
        if (!name) continue;
        if (name === p || name.indexOf(p) >= 0 || p.indexOf(name) >= 0) {
          this.tire_name = name;
          return;
        }
        // Quest-X / 悦驰UHP  <->  悦驰UHP/Quest-X
        var parts = name.split(/\s*\/\s*/);
        if (parts.some(function (x) {
          return x && p.indexOf(x) >= 0;
        })) {
          this.tire_name = name;
          return;
        }
      }
    },
    removeActiveTab: function removeActiveTab() {
      if (this.tireTabs.length <= 1) return;
      this.tireTabs.splice(this.activeTab, 1);
      if (this.activeTab >= this.tireTabs.length) {
        this.activeTab = this.tireTabs.length - 1;
      }
    },
    pickImage: function pickImage(key) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var ch, msg, tempPath, res, imageUrl;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (_this6.ensureLoggedIn()) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                _context5.prev = 2;
                _context5.next = 5;
                return _this6.chooseImage(1);
              case 5:
                ch = _context5.sent;
                _context5.next = 13;
                break;
              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);
                msg = _context5.t0 && (_context5.t0.errMsg || _context5.t0.message) || '';
                if (!/cancel/i.test(msg)) _this6.showToast(msg || '无法打开相册，请检查微信照片权限');
                return _context5.abrupt("return");
              case 13:
                tempPath = ch && ch.tempFilePaths && ch.tempFilePaths[0];
                if (tempPath) {
                  _context5.next = 17;
                  break;
                }
                _this6.showToast('未获取到图片，请重新选择');
                return _context5.abrupt("return");
              case 17:
                uni.showLoading({
                  title: '上传中',
                  mask: true
                });
                _context5.prev = 18;
                _context5.next = 21;
                return _this6.uploadImg(tempPath);
              case 21:
                res = _context5.sent;
                if (!(res.code === 1 && res.data)) {
                  _context5.next = 27;
                  break;
                }
                imageUrl = typeof res.data === 'string' ? res.data : res.data.url || '';
                if (!imageUrl) {
                  _context5.next = 27;
                  break;
                }
                _this6.$set(_this6.formImg, key, imageUrl);
                return _context5.abrupt("return");
              case 27:
                if (!(Number(res && res.code) === 401)) {
                  _context5.next = 32;
                  break;
                }
                uni.removeStorageSync('token');
                _this6.showToast('登录已失效，请重新登录');
                setTimeout(function () {
                  return uni.reLaunch({
                    url: '/pages/login/login'
                  });
                }, 800);
                return _context5.abrupt("return");
              case 32:
                _this6.showToast(res && res.msg || '图片上传失败');
                _context5.next = 38;
                break;
              case 35:
                _context5.prev = 35;
                _context5.t1 = _context5["catch"](18);
                _this6.showToast('图片上传失败，请检查网络后重试');
              case 38:
                _context5.prev = 38;
                uni.hideLoading();
                return _context5.finish(38);
              case 41:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 8], [18, 35, 38, 41]]);
      }))();
    },
    // test：弹出信封开启动画
    openEnvelope: function openEnvelope() {
      this.showEnvelope = true;
    },
    submit: function submit() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var codes, uniq, payload, res;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!_this7.submitting) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return");
              case 2:
                if (_this7.salutation.trim()) {
                  _context6.next = 4;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请填写称谓'));
              case 4:
                if (/^1\d{10}$/.test(_this7.mobile)) {
                  _context6.next = 6;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请填写正确手机号'));
              case 6:
                if (_this7.purchase_channel) {
                  _context6.next = 8;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请选择购买渠道'));
              case 8:
                if (_this7.purchase_city.trim()) {
                  _context6.next = 10;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请填写购买城市'));
              case 10:
                if (_this7.vehicle_type) {
                  _context6.next = 12;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请选择汽车类型'));
              case 12:
                if (_this7.tire_type) {
                  _context6.next = 14;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请选择轮胎类型'));
              case 14:
                if (_this7.tire_name) {
                  _context6.next = 16;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请选择花纹编号'));
              case 16:
                if (_this7.tireTabs.length) {
                  _context6.next = 18;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请至少扫描绑定1个子口码'));
              case 18:
                if (!(_this7.tireTabs.length > 5)) {
                  _context6.next = 20;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('最多绑定5个子口码'));
              case 20:
                // for (let i = 0; i < this.tireTabs.length; i++) {
                // 	const t = this.tireTabs[i]
                // 	if (!String(t.bead_code || '').trim()) {
                // 		return this.showToast('请完善轮胎' + (i + 1) + '的子口码')
                // 	}
                // 	if (!String(t.pattern_no || '').trim()) {
                // 		return this.showToast('请完善轮胎' + (i + 1) + '的花纹编号')
                // 	}
                // 	if (!String(t.tire_spec || '').trim()) {
                // 		return this.showToast('请完善轮胎' + (i + 1) + '的轮胎规格')
                // 	}
                // 	if (!String(t.load_speed || '').trim()) {
                // 		return this.showToast('请完善轮胎' + (i + 1) + '的负荷速级')
                // 	}
                // 	if (!String(t.year_week || '').trim()) {
                // 		return this.showToast('请完善轮胎' + (i + 1) + '的年周号')
                // 	}
                // }
                codes = _this7.tireTabs.map(function (t) {
                  return String(t.bead_code).trim();
                });
                uniq = Array.from(new Set(codes));
                if (!(uniq.length !== codes.length)) {
                  _context6.next = 24;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('存在重复的子口码'));
              case 24:
                if (_this7.formImg.vehicle_install_image) {
                  _context6.next = 26;
                  break;
                }
                return _context6.abrupt("return", _this7.showToast('请上传轮胎装车图'));
              case 26:
                _this7.submitting = true;
                payload = {
                  order_no: String(_this7.linked_order_no || _this7.order_no_input || '').trim(),
                  salutation: _this7.salutation.trim(),
                  mobile: _this7.mobile.trim(),
                  purchase_channel: _this7.purchase_channel,
                  purchase_city: _this7.purchase_city.trim(),
                  delivery_address: _this7.delivery_address.trim(),
                  vehicle_type: _this7.vehicle_type,
                  tire_type: _this7.tire_type,
                  tire_name: _this7.tire_name,
                  purchase_quantity: _this7.tireTabs.length,
                  vehicle_install_image: _this7.formImg.vehicle_install_image,
                  beads: _this7.tireTabs.map(function (t) {
                    return {
                      bead_code: String(t.bead_code).trim(),
                      pattern_no: String(t.pattern_no).trim(),
                      tire_spec: String(t.tire_spec).trim(),
                      load_speed: String(t.load_speed).trim(),
                      year_week: String(t.year_week).trim()
                    };
                  })
                };
                _context6.prev = 28;
                _context6.next = 31;
                return _this7.warrantySubmit(payload);
              case 31:
                res = _context6.sent;
                if (res.code === 1) {
                  _this7.showToast('提交成功');
                  _this7.openEnvelope();
                  setTimeout(function () {
                    uni.navigateBack({
                      fail: function fail() {
                        return uni.switchTab({
                          url: '/pagesA/referral/index'
                        });
                      }
                    });
                  }, 10000);
                }
              case 33:
                _context6.prev = 33;
                _this7.submitting = false;
                return _context6.finish(33);
              case 36:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[28,, 33, 36]]);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 689:
/*!**********************************************************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesB/warrantyRegister/warrantyRegister.vue?vue&type=style&index=0&id=56a90c68&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_style_index_0_id_56a90c68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./warrantyRegister.vue?vue&type=style&index=0&id=56a90c68&lang=scss&scoped=true& */ 690);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_style_index_0_id_56a90c68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_style_index_0_id_56a90c68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_style_index_0_id_56a90c68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_style_index_0_id_56a90c68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_warrantyRegister_vue_vue_type_style_index_0_id_56a90c68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 690:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesB/warrantyRegister/warrantyRegister.vue?vue&type=style&index=0&id=56a90c68&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[683,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesB/warrantyRegister/warrantyRegister.js.map