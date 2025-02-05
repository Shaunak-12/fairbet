export const config: any = {
    "emailAuthApi" : "LoginAuth",
    "loginApi" : "UserLogin",
    "getUserSite" : "getUserSiteV1",
    "getDashboardCount" : "dashboard/getDashboardCountV1",
    "getDashboardDepositChart" : "dashboard/getDashboardDepositChartV1",
    "dashboardChart":"dashboard/GetCallBackConversationDashboardDetails",
    "reportDetails":"report/DownloadPlayerConversationDetails",
    "getAllPlayer" : "user/getAllPlayerV1",
    "getAllPlayerForEdit":"user/GetAllPlayerForEditV1",
    "getUserData" : "user/getUserDataV1",
    "editPlayerDetails":"user/EditPlayerDetails",
    "hasDepositAccess" : "user/HasDepositAccess",
    "saveIMPSAccess" : "user/SaveIMPSAccess",
    "getUserStatement" : "user/getUserStatementV1",
    "getUserDepositeData" : "user/GetUserDepositeDataV1",
    "withdrawalData" : "user/WithdrawalDataV1",
    "getUserWithdrawal" : "user/GetUserWithdrawDataV1",
    "exportStatement" : "user/ExportStatementV1",
    "processWithdrawal" : "user/ProcessWithdrawal",
    "transferFundViaPayconnect" : "user/TransferFundViaPayconnect",
    "exportDepositAndWithdrawal" : "user/ExportDepositAndWithdrawalV1",
    "approveWithdrawal" : "user/ApproveWithdrawal",
    "downloadUserWithdrawData" : "dashboard/DownloadUserWithdrawDataV1",
    "downloadUserDepositData":"dashboard/DownloadUserDepositDataV1",
    "downloadUserBonusDepositData":"dashboard/DownloadUserBonusDepositDataV1",
    "getAllAdmins" : "user/GetAllAdmins",
    "getAdminRoles" : "user/GetAdminRolesData",
    "getReportRegisterUser" : "report/GetReportRegisterUserV1",
    "downloadAllReportData" : "report/DownloadAllReportDataV1",
    "saveRoleChange" : "user/SaveRoleChange",
    "getAdminMenuMappingsData" : "GetAdminMenuMappingsData",
    "saveBlockAdmin" : "user/SaveBlockAdmin",
    "saveDepositAccess" : "user/SaveDepositAccess",
    "saveAdminProfile" : "user/SaveAdminProfile",
    "saveUserProfile": "user/SaveUserProfileV1",
    "updateUserAccount":"user/UpdateUserAccountV1",
    "changeUserStatus":"user/ChangeUserStatus",
    "getPGMaster" : "bank/getPaymentGatewayMasterDetailsV1",
    "getDepoPromo" : "user/GetDepositPromotionList",
    "changeDepoPromoStat" : "user/UpdateDepositPromotionStatus",
    "changePaymentGatewayStatus" : "bank/ChangePaymentGatewayStatus",
    "getUserDepositList" : "report/getUserDepositListV1",
    "downloadUserDepositList" : "report/DownloadUserDepositListV1",
    "getCallBackRequest" : "user/GetCallBackRequestV1",
    "saveCallRequest" : "user/SaveCallRequest",
    "getCallLog" : "user/getCallLogV1",
    "getGamePlayed" : "user/getGamePlayedV1",
    "getOnlineDepositList" : "user/getOnlineDepositListV1",
    "getCreatorPages" : "getCreatorPages",
    "getDCPromotionbyPage" : "getDCPromotionViaPageid",
    "saveCreatorPage" : "saveCreatorPage",
    "changeCreatorPageStatus" : "ChangeCreatorPageStatus",
    "getCreatorStatements" : "getDCPaymentStatement",
    "getDCPromotionList" : "getDCPromotionList",
    "saveDCPaymentStatement" : "saveDCPaymentStatement",
    "getDCPromotion" : "getDCPromotion",
    "getDCPageList" : "getDCPageList",
    "saveDCPromotion" : "saveDCPromotion",
    "getDCViewHistoryViaId" : "getDCViewHistoryViaId",
    "changeDCPromotionStatus":"ChangeDCPromotionStatus",
    "changePassword" : "ChangePassword",
    "exportWithdrawalData":"user/ExportWithdrawalDataV1",
    "playerResetPassword":"user/PlayerResetPassword",
    "smsProvider":"user/GetSMSOTPServiceProviderList",
    "saveProvider":"user/SaveSMSOTPServiceProvider",
    "multiLanguage":"user/GetMultiLanguages",
    "saveLan":"user/SaveLanguage",
    "updateLan":"user/UpdateSMSProviderDetails",
    "getallotpList":"user/GetAllSMSOTPList",
    "getAllCRMIssue":"CRMIssueTracker/GetCRMIssue", //crm
    "getIssueCategoryList":"CRMIssueTracker/GetIssueCategoryList", //crm
    "getPriorityList":"CRMIssueTracker/GetPriorityList", //crm
    "getIssueStatusList":"CRMIssueTracker/GetIssueStatusList", //crm
    "getcrmAdmin":"CRMIssueTracker/GetAllAdmins", //crm
    "createIssue":"CRMIssueTracker/CreateIssue", //crm
    "updateIssue":"CRMIssueTracker/UpdateIssue", //crm
    "assignIssue":"CRMIssueTracker/AddAssignment", //crm
    "myissue":"CRMIssueTracker/GetCRMIssueById", //crm
    "changeStatus":"CRMIssueTracker/ChangeStatus", //crm
    "addComment":"CRMIssueTracker/AddHistory", //crm
    "getComment":"CRMIssueTracker/GetAllHistory", //crm
    "getScratchCardData":"user/GetDepositBonusScratchCardList",
    "getSpinWheels":"user/GetPromoSpinWheelMasterList",
    "chSpMstStat":"user/UpdatePromoSpinWheelMasterStatus",
    "vipTempList":"user/GetListsForVipTemplateConfig",//vip group,temp,level
    "getVGrpMst":"user/GetListsForVipGroupMaster",//vip group
    "getVTmpMst":"user/GetListsForVipTemplateMaster",//temp
    "getVLevMst":"user/GetListsForVipLevelMaster",//level
    "newGrpMst":"user/SaveGroupMaster",
    "newLevMst":"user/SaveLevelMaster",
    "newTempMst":"user/SaveTemplateMaster",
    "getLvlTmpMap":"user/GetLevelTemplateMappList",
    "getAllGroups":"user/GetAllGroupMasterList",//SiteCode=WBJ
    "getAllTemplates":"user/GetAllTemplateMasterList",
    "getAllLevels":"user/GetAllLevelMasterList",
    "newLevTmpMap":"user/SaveLevelTemplateMapping",
    "setLevTmpMap":"user/UpdateLevelTemplateMappingValues",
    "setGrpStat":"user/UpdateGroupMasterStatus",
    "setTmpStat":"user/UpdateTemplateMasterStatus",
    "setLevStat":"user/UpdateLevelMasterStatus",
    "setGrpName":"user/UpdateGroupMasterName",
    "setLevName":"user/UpdateLevelMasterName",
    "setTmpName":"user/UpdateTemplateMasterName",
    "getVIPTmpFeatures":"user/GetAllVIPTemplateFeatures",
    "getTmpFeatMap":"user/GetTemplateFeaturesMappList",
    "newTmpFeatMap":"user/SaveTemplateFeatureMapping",
    "getUsrLevVIP":"user/GetAllRefCodeList",
    "setTmpFeatStat":"user/UpdateTemplateFeatureStatus",
    "getUsrForTmpCfg":"user/GetAllPlayerForTemplateConfig",
    "newDepoPromo":"user/SaveDepositPromotion",
    "rollOverupdate":"user/UpdateUserWthdrawalRollover",
    "userdepositbous":"user/GetUserDepositeBonusList",
    "reportBonuslist":"report/DownloadUserDepositeBonusList",
    "exportDataDeposit":"user/ExportUserDeposite",
    "assignPlayer":"user/GetAssignPlayer",
    "depositmapping":"user/GetAllDepositAmountsWithMapping", //bank deposit pg amount
    "changePGStatus":"user/ChangeDepositAmountStatus", //bank deposit pg amount
    "getCategoryList":"user/GetCallRequestCategoryList", //bank deposit pg amount
    "getSubCategoryList":"user/GetCallRequestSubCategoryList", //bank deposit pg amount
    "saveConversation":"user/SaveCallBackConversation", //bank deposit pg amount
    "callbackConversation":"user/GetCallBackConversationDetails", //bank deposit pg amount
    "saveUserCall":"user/SaveUserCallRemark", //bank deposit pg amount
    "getAllAdminList":"user/GetCallSupportAdminList", //bank deposit pg amount
    "updateLead":"user/UpdateAssignPlayer", //bank deposit pg amount
    "userCallBackStatus":"user/UpdateCallBackConversationStatus", //bank deposit pg amount
    "bulkLeadUpload":"lead/UploadBulkLead", //bulk lead
    "getAdminDetails": "user/GetAssignPlayersWithProfit",
    "assignAdminId": "user/UpdateAssignPlayersByIds" ,
    "getAllAgent": "user/GetAllAdminAgent", // add agent
    "updateStatus": "user/UpdateAgentVerificationStatus", // add agent
    "callLead": "user/CallToPlayer", // Call My Lead
    "callLead1": "user/CallToPlayerV1" ,// Call My Lead
    "agentlogin": "user/AgentVoIpLogin",// Call My Lead
    "callleadDetails": "user/GetLeadCallDetails", // Call details
    "getAdminCall": "user/GetAdminIsOnCall", // Call 
    "callResetStatus": "user/UpdateCallRequestStatus", // call status
    "sendSMS": "user/SendSMSToPlayer" ,// send SMS
    "viciCall": "user/Click2callvicicdial", // vici call call request
    "userPromo": "user/GetPromotionsConfigursToUsers", // palyerlist user promo
    "updatePromo": "user/SavePromotionConfigurationForUsers" // palyerlist user promo
 }