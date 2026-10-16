(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesD/ShelfGoods/ShelfGoods"],{

/***/ 277:
/*!*******************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/main.js?{"page":"pagesD%2FShelfGoods%2FShelfGoods"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _ShelfGoods = _interopRequireDefault(__webpack_require__(/*! ./pagesD/ShelfGoods/ShelfGoods.vue */ 278));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_ShelfGoods.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 278:
/*!************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesD/ShelfGoods/ShelfGoods.vue ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShelfGoods.vue?vue&type=template&id=3ae8cea4& */ 279);
/* harmony import */ var _ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShelfGoods.vue?vue&type=script&lang=js& */ 281);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _ShelfGoods_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShelfGoods.vue?vue&type=style&index=0&lang=scss& */ 283);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pagesD/ShelfGoods/ShelfGoods.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 279:
/*!*******************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesD/ShelfGoods/ShelfGoods.vue?vue&type=template&id=3ae8cea4& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ShelfGoods.vue?vue&type=template&id=3ae8cea4& */ 280);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_template_id_3ae8cea4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 280:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesD/ShelfGoods/ShelfGoods.vue?vue&type=template&id=3ae8cea4& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uRadioGroup: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-radio-group/u-radio-group */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-radio-group/u-radio-group")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-radio-group/u-radio-group.vue */ 827))
    },
    uRadio: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-radio/u-radio */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-radio/u-radio")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-radio/u-radio.vue */ 835))
    },
    uIcon: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-icon/u-icon */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-icon/u-icon.vue */ 744))
    },
    uUpload: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-upload/u-upload */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-upload/u-upload")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-upload/u-upload.vue */ 843))
    },
    "u-Textarea": function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u--textarea/u--textarea */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u--textarea/u--textarea.vue */ 853))
    },
    uPicker: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-picker/u-picker */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-picker/u-picker")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-picker/u-picker.vue */ 859))
    },
    uPopup: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-popup/u-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-popup/u-popup.vue */ 789))
    },
    uniTable: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-table/components/uni-table/uni-table */ "uni_modules/uni-table/components/uni-table/uni-table").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-table/components/uni-table/uni-table.vue */ 867))
    },
    uniTr: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-table/components/uni-tr/uni-tr */ "uni_modules/uni-table/components/uni-tr/uni-tr").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-table/components/uni-tr/uni-tr.vue */ 874))
    },
    uniTh: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-table/components/uni-th/uni-th */ "uni_modules/uni-table/components/uni-th/uni-th").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-table/components/uni-th/uni-th.vue */ 881))
    },
    uniTd: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-table/components/uni-td/uni-td */ "uni_modules/uni-table/components/uni-td/uni-td").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-table/components/uni-td/uni-td.vue */ 888))
    },
    uSwitch: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-switch/u-switch */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-switch/u-switch")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-switch/u-switch.vue */ 895))
    },
    empty: function () {
      return __webpack_require__.e(/*! import() | components/empty/empty */ "components/empty/empty").then(__webpack_require__.bind(null, /*! @/components/empty/empty.vue */ 739))
    },
    uModal: function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u-modal/u-modal */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u-modal/u-modal.vue */ 903))
    },
    "u-Input": function () {
      return Promise.all(/*! import() | uni_modules/uview-ui/components/u--input/u--input */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uview-ui/components/u--input/u--input")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uview-ui/components/u--input/u--input.vue */ 911))
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
  var g0 = _vm.tags.length
  var g1 = _vm.activeggList.length
  var l0 =
    g1 > 0
      ? _vm.__map(_vm.tableList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g2 = ["原价", "现价", "库存"].includes(item.name)
          return {
            $orig: $orig,
            g2: g2,
          }
        })
      : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.guiGeShow = true
    }
    _vm.e1 = function ($event) {
      _vm.tagshow = true
    }
    _vm.e2 = function ($event) {
      _vm.show = false
    }
    _vm.e3 = function ($event) {
      _vm.guiGeShow = false
    }
    _vm.e4 = function ($event) {
      _vm.modalshow = false
    }
    _vm.e5 = function ($event) {
      _vm.tagshow = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l0: l0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 281:
/*!*************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesD/ShelfGoods/ShelfGoods.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ShelfGoods.vue?vue&type=script&lang=js& */ 282);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 282:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesD/ShelfGoods/ShelfGoods.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 57));
var _config = _interopRequireDefault(__webpack_require__(/*! @/config.js */ 162));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      tagshow: false,
      //标签
      tagName: '',
      //标签弹窗里面的input value

      modalshow: false,
      title: '温馨提示',
      modalvalue: '',
      //统一价格
      placeholder: "请输入统一价格",
      radiolist1: [{
        id: 0,
        name: '用户可下单',
        disabled: false
      }, {
        id: 1,
        name: '只可门店',
        disabled: false
      }],
      radiovalue1: 0,
      radiolist2: [{
        id: 2,
        name: '多规格',
        disabled: false
      }, {
        id: 1,
        name: '单规格',
        disabled: false
      }],
      radiovalue2: 2,
      price: "",
      //价格
      json: "",
      //详情
      fileList1: [],
      //展示图
      fileList2: [],
      //详情展示图
      show: false,
      //分类弹窗
      guiGeShow: false,
      //规格弹窗
      columns: [[]],
      //分类
      gglist: [],
      tableList: [],
      //表格th
      activeggList: [],
      //选中的规格
      skus: [],
      //上传的规格
      guiGeTitle: '',
      type: '',
      //分裂
      shoptitle: "",
      //商品名称
      tags: [],
      //标签
      editid: '' //修改的id
    };
  },
  onLoad: function onLoad(e) {
    this.specListApi();
    if (e.id) {
      this.editid = e.id;
      this.goodsDetailApi();
    }
  },
  onShow: function onShow() {
    this.specListApi();
    this.categoryListApi();
  },
  methods: {
    addsku: function addsku() {
      this.showToast('规格请在后台或联系管理员维护');
      this.removeskus();
    },
    removeskus: function removeskus() {
      this.tableList = [];
      this.skus = [];
      this.activeggList = [];
    },
    goodsDetailApi: function goodsDetailApi() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res, tagArr, tablearr;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.storegoodsDetail({
                  id: _this.editid
                });
              case 2:
                res = _context.sent;
                if (res.code == 1) {
                  _this.type = {
                    id: res.data.type_id,
                    name: res.data.type_name
                  };
                  _this.shoptitle = res.data.title;
                  tagArr = res.data.tags.split(',');
                  _this.tags = tagArr;
                  _this.fileList1.push({
                    url: res.data.image
                  });
                  res.data.images.forEach(function (item) {
                    _this.fileList2.push({
                      url: item
                    });
                  });
                  // images: images,
                  _this.json = res.data.json;
                  _this.price = res.data.price;
                  _this.skus = res.data.skus;
                  _this.radiovalue1 = Number(res.data.store_goods);
                  _this.radiovalue2 = Number(res.data.type);
                  _this.gglist.forEach(function (item) {
                    res.data.groups.forEach(function (item_1) {
                      if (item.name == item_1) {
                        item.is_show = true;
                        _this.activeggList.push(item);
                      }
                    });
                  });
                  _this.guiGeTitle = '已上传';
                  tablearr = [{
                    name: "原价"
                  }, {
                    name: "现价"
                  }, {
                    name: "库存"
                  }, {
                    name: "编码"
                  }, {
                    name: "状态"
                  }];
                  _this.tableList = [].concat((0, _toConsumableArray2.default)(_this.activeggList), tablearr);
                  console.log('res', res);
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    exectag: function exectag() {
      console.log('this.tagName', this.tagName);
      if (this.tagName.length > 0) {
        if (this.tags.length < 3) {
          this.tags.push(this.tagName);
          this.tagName = '';
          this.tagshow = false;
        } else {
          this.showToast('最多输入3个标签');
        }
      } else {
        this.showToast('请输入标签内容');
      }
    },
    // 修改商品
    editGoodsApi: function editGoodsApi() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var images, groups, items, tags_1, res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.shoptitle) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请输入名称'));
              case 2:
                if (_this2.type) {
                  _context2.next = 4;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请选择分类'));
              case 4:
                if (!(_this2.radiovalue2 == 2)) {
                  _context2.next = 11;
                  break;
                }
                if (!(_this2.skus.length <= 0)) {
                  _context2.next = 7;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请上传规格'));
              case 7:
                if (!(_this2.activeggList <= 0)) {
                  _context2.next = 9;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请上传规格'));
              case 9:
                _context2.next = 13;
                break;
              case 11:
                if (_this2.price) {
                  _context2.next = 13;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请输入价格'));
              case 13:
                if (!(_this2.tags.length <= 0)) {
                  _context2.next = 15;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请输入标签'));
              case 15:
                if (_this2.json) {
                  _context2.next = 17;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请输入详细描述'));
              case 17:
                if (!(_this2.fileList1.length <= 0)) {
                  _context2.next = 19;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请上传展示图'));
              case 19:
                if (!(_this2.fileList2.length <= 0)) {
                  _context2.next = 21;
                  break;
                }
                return _context2.abrupt("return", _this2.showToast('请上传详情展示图'));
              case 21:
                images = '';
                _this2.fileList2.forEach(function (item, index) {
                  if (index == _this2.fileList2.length - 1) {
                    if (item.url.url) {
                      images += item.url.url;
                    } else {
                      images += item.url;
                    }
                  } else {
                    if (item.url.url) {
                      images += item.url.url + ',';
                    } else {
                      images += item.url + ',';
                    }
                  }
                });
                groups = [];
                items = [];
                _this2.activeggList.forEach(function (item) {
                  groups.push(item.name);
                  var arr = [];
                  item.item.forEach(function (item_1) {
                    arr.push(item_1.name);
                  });
                  items.push(arr);
                });
                tags_1 = '';
                _this2.tags.forEach(function (item, index) {
                  if (index == _this2.tags.length - 1) {
                    tags_1 += item;
                  } else {
                    tags_1 += item + ',';
                  }
                });
                _context2.next = 30;
                return _this2.editGoods({
                  id: _this2.editid,
                  type_id: _this2.type.id,
                  title: _this2.shoptitle,
                  tags: tags_1,
                  image: _this2.fileList1[0].url.url ? _this2.fileList1[0].url.url : _this2.fileList1[0].url,
                  images: images,
                  json: _this2.json,
                  price: _this2.price,
                  state: 1,
                  skus: _this2.skus,
                  groups: groups,
                  items: items,
                  store_goods: _this2.radiovalue1,
                  type: _this2.radiovalue2
                });
              case 30:
                res = _context2.sent;
                if (res.code == 1) {
                  _this2.showToast('修改成功，请等待审核');
                  uni.navigateBack();
                }
              case 32:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 上架
    addGoodsApi: function addGoodsApi() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var images, groups, items, tags_1, res;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_this3.shoptitle) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请输入名称'));
              case 2:
                if (_this3.type) {
                  _context3.next = 4;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请选择分类'));
              case 4:
                if (!(_this3.radiovalue2 == 2)) {
                  _context3.next = 11;
                  break;
                }
                if (!(_this3.skus.length <= 0)) {
                  _context3.next = 7;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请上传规格'));
              case 7:
                if (!(_this3.activeggList <= 0)) {
                  _context3.next = 9;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请上传规格'));
              case 9:
                _context3.next = 13;
                break;
              case 11:
                if (_this3.price) {
                  _context3.next = 13;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请输入价格'));
              case 13:
                if (!(_this3.tags.length <= 0)) {
                  _context3.next = 15;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请输入标签'));
              case 15:
                if (_this3.json) {
                  _context3.next = 17;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请输入详细描述'));
              case 17:
                if (!(_this3.fileList1.length <= 0)) {
                  _context3.next = 19;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请上传展示图'));
              case 19:
                if (!(_this3.fileList2.length <= 0)) {
                  _context3.next = 21;
                  break;
                }
                return _context3.abrupt("return", _this3.showToast('请上传详情展示图'));
              case 21:
                images = '';
                _this3.fileList2.forEach(function (item, index) {
                  if (index == _this3.fileList2.length - 1) {
                    if (item.url.url) {
                      images += item.url.url;
                    } else {
                      images += item.url;
                    }
                  } else {
                    if (item.url.url) {
                      images += item.url.url + ',';
                    } else {
                      images += item.url + ',';
                    }
                  }
                });
                groups = [];
                items = [];
                _this3.activeggList.forEach(function (item) {
                  groups.push(item.name);
                  var arr = [];
                  item.item.forEach(function (item_1) {
                    arr.push(item_1.name);
                  });
                  items.push(arr);
                });
                tags_1 = '';
                _this3.tags.forEach(function (item, index) {
                  if (index == _this3.tags.length - 1) {
                    tags_1 += item;
                  } else {
                    tags_1 += item + ',';
                  }
                });
                _context3.next = 30;
                return _this3.addGoods({
                  type_id: _this3.type.id,
                  title: _this3.shoptitle,
                  tags: tags_1,
                  image: _this3.fileList1[0].url.url ? _this3.fileList1[0].url.url : _this3.fileList1[0].url,
                  images: images,
                  json: _this3.json,
                  price: _this3.price,
                  state: 1,
                  skus: _this3.skus,
                  groups: groups,
                  items: items,
                  store_goods: _this3.radiovalue1,
                  type: _this3.radiovalue2
                });
              case 30:
                res = _context3.sent;
                if (res.code == 1) {
                  _this3.showToast('添加成功，请等待审核');
                  setTimeout(function () {
                    uni.navigateBack();
                  }, 1500);
                }
              case 32:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 同意价格确定
    modalConfirm: function modalConfirm() {
      var _this4 = this;
      if (this.modalvalue) {
        this.skus.forEach(function (item) {
          if (_this4.modalname == '原价') {
            item.market_price = _this4.modalvalue;
          } else if (_this4.modalname == '现价') {
            item.price = _this4.modalvalue;
          } else if (_this4.modalname == '库存') {
            item.stock = _this4.modalvalue;
          }
        });
        this.modalshow = false;
      } else {
        this.showToast('不能为空');
      }
      this.$forceUpdate();
    },
    // 显示统一价格
    setmodal: function setmodal(name) {
      console.log(name);
      this.modalvalue = '';
      this.placeholder = "\u8BF7\u8F93\u5165\u7EDF\u4E00".concat(name);
      this.modalname = name;
      this.modalshow = true;
    },
    // 上传规格
    skus_btn: function skus_btn() {
      if (this.skus.length > 0) {
        this.guiGeShow = false;
        this.guiGeTitle = '已上传';
      } else {
        this.showToast('请选择规格');
      }
    },
    // 选中取消规格
    removeTable: function removeTable(res) {
      var _this5 = this;
      this.skus = [];
      var actarr = [];
      this.activeggList[0].item.forEach(function (item) {
        var arr = {
          attr: [],
          market_price: "9.90",
          price: "9.90",
          stock: 10,
          sn: "",
          image: "",
          status: true
        };
        arr.attr.push(item.name);
        actarr.push(arr);
      });
      this.skus = actarr;
      this.activeggList.forEach(function (item_1, index_1) {
        if (index_1 !== 0) {
          _this5.setskus(item_1);
        }
      });
      uni.hideLoading();
      this.$forceUpdate();
    },
    setskus: function setskus(res) {
      var arr = [];
      this.skus.forEach(function (item) {
        res.item.forEach(function (item_1) {
          arr.push({
            attr: [].concat((0, _toConsumableArray2.default)(item.attr), [item_1.name]),
            market_price: "9.90",
            price: "9.90",
            stock: 0,
            sn: "",
            image: "",
            status: true
          });
        });
      });
      this.skus = arr;
    },
    // 选择规格
    settable: function settable(res) {
      var _this6 = this;
      this.gglist.forEach(function (item) {
        if (item.id == res.id) {
          if (item.is_show) {
            if (_this6.activeggList.length == 0) return _this6.showToast('至少选择一个规格');
            item.is_show = false;
            _this6.activeggList.forEach(function (item_1, idx_1) {
              if (item_1.id == res.id) {
                _this6.activeggList.splice(idx_1, 1);
              }
            });
          } else {
            item.is_show = true;
            _this6.activeggList.push(res);
          }
        }
      });
      this.removeTable(res);
      var tablearr = [{
        name: "原价"
      }, {
        name: "现价"
      }, {
        name: "库存"
      }, {
        name: "编码"
      }, {
        name: "状态"
      }];
      this.tableList = [].concat((0, _toConsumableArray2.default)(this.activeggList), tablearr);
    },
    confirm: function confirm(e) {
      console.log('e', e);
      this.show = false;
      this.type = e.value[0];
    },
    // 分类列表
    categoryListApi: function categoryListApi(e) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var res;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this7.categoryList({
                  page: 1,
                  limit: 1000
                });
              case 2:
                res = _context4.sent;
                if (res.code == 1) {
                  _this7.columns[0] = res.data.rows;
                }
              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 规格列表
    specListApi: function specListApi(e) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var res;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this8.specList({
                  page: 1,
                  limit: 1000
                });
              case 2:
                res = _context5.sent;
                if (res.code == 1) {
                  _this8.gglist = res.data.rows;
                }
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    // 删除图片
    deletePic: function deletePic(event) {
      this["fileList".concat(event.name)].splice(event.index, 1);
    },
    // 新增图片
    afterRead: function afterRead(event) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var lists, fileListLen, i, result, item;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
                lists = [].concat(event.file);
                fileListLen = _this9["fileList".concat(event.name)].length;
                lists.map(function (item) {
                  _this9["fileList".concat(event.name)].push(_objectSpread(_objectSpread({}, item), {}, {
                    status: 'uploading',
                    message: '上传中'
                  }));
                });
                i = 0;
              case 4:
                if (!(i < lists.length)) {
                  _context6.next = 14;
                  break;
                }
                _context6.next = 7;
                return _this9.uploadFilePromise(lists[i].url);
              case 7:
                result = _context6.sent;
                item = _this9["fileList".concat(event.name)][fileListLen];
                _this9["fileList".concat(event.name)].splice(fileListLen, 1, Object.assign(item, {
                  status: 'success',
                  message: '',
                  url: result
                }));
                fileListLen++;
              case 11:
                i++;
                _context6.next = 4;
                break;
              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    uploadFilePromise: function uploadFilePromise(url) {
      return new Promise(function (resolve, reject) {
        var a = uni.uploadFile({
          url: _config.default.serverIp + '/api/common/upload',
          // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file',
          formData: {
            token: uni.getStorageSync('token') || ''
          },
          success: function success(res) {
            var imgres = JSON.parse(res.data);
            console.log('imgres', imgres);
            setTimeout(function () {
              resolve(imgres.data);
            }, 1000);
          }
        });
      });
    },
    // 打开分类选择框
    openShow: function openShow() {
      if (this.columns[0].length == 0) {
        uni.showModal({
          title: '提示',
          content: '当前还未设置商品分类，请在后台或联系管理员维护。',
          showCancel: false
        });
      } else {
        this.show = true;
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 283:
/*!**********************************************************************************************************!*\
  !*** D:/WorkSpace/miniProgram/omcuni/pagesD/ShelfGoods/ShelfGoods.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Document/Tools/HBuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ShelfGoods.vue?vue&type=style&index=0&lang=scss& */ 284);
/* harmony import */ var _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Document_Tools_HBuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ShelfGoods_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 284:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/WorkSpace/miniProgram/omcuni/pagesD/ShelfGoods/ShelfGoods.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[277,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesD/ShelfGoods/ShelfGoods.js.map