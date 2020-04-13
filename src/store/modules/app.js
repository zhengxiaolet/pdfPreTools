const app = {
    state: {
		endorCreateEmailData: null, //邮箱接口入参
		orderId:'',//变更邮箱订单号
		endorCreateAddressData:null,//地址
		addressOrderId:'',//变更地址订单号
		endorApplyData:'',//续期缴费
		renewalPaymentPolicyNo:'',//续期缴费保单号
		renewalPaymentOrderId:'',//续期缴费订单号
		getMoneyAuditType:'',//领取审核类型
		getMoneyData:'',//领取数据
		getMoneyOrderId:'',//领取订单号
    },
    mutations: {
		//存入邮箱变更数据
		setendorCreateEmailData (state,data){
			state.endorCreateEmailData = data;
		},
		//存入邮箱变更订单号
		setorderId (state,data){
			state.orderId = data;
		},
		//存入地址变更数据
		setendorCreateAddressData (state,data){
			state.endorCreateAddressData = data;
		},
		//存入地址变更订单号
		setaddressOrderId (state,data){
			state.addressOrderId = data;
		},
		//存入续期缴费变更订单号
		setrenewalPaymentOrderId(state,data){
			state.renewalPaymentOrderId = data;
		},
		//存入续期缴费变更数据
		setendorApplyData(state,data){
			state.endorApplyData = data;
		},
		//存入续期缴费账号变更保单号
		setrenewalPaymentPolicyNo(state,data){
			state.renewalPaymentPolicyNo = data;
		},
		//getMoneyAuditType 领取审核类型
		setgetMoneyAuditType(state,data){
			state.getMoneyAuditType = data;
		},
		//setgetMoneyData   存入领取数据
		setgetMoneyData(state,data){
			state.getMoneyData = data;
		},
		//getMoneyOrderId 存入领取订单号
		setgetMoneyOrderId(state,data){
			state.getMoneyOrderId = data;
		},
    }
};

export default app;
