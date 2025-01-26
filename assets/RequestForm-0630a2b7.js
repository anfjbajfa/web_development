import{_ as f,Q as v,h as b,q as g,o as N,c as q,d as x,b as t,k as w,f as r,w as l,X as d,v as i,Y as y,t as V,F as U,n as j,E as u,T as F,Z as M,C as S}from"./index-6ddcb258.js";const _={class:"form-container"},c={class:"form-box"},k={class:"form-group"},E={class:"form-group"},R={class:"form-group"},B={class:"form-group"},D={class:"form-group"},T={class:"form-group"},C={class:"form-group"},I={class:"form-group newsletter"},O=["disabled"],H={__name:"RequestForm",setup(Q){const p=v(),a=b(!1),s=g({gender:"",fullName:"",email:"",projectName:"",site:"",product:"",issue:"",newsletter:!1}),m=async()=>{if(!s.gender||!s.fullName||!s.site||!s.product){u.error("请填写必需信息");return}a.value=!0;const n={phone:F().phone,status:1,gender:s.gender,fullName:s.fullName,email:s.email,projectName:s.projectName,site:s.site,product:s.product,issue:s.issue,newsletter:s.newsletter};M(n).then(()=>{u.success("表单提交成功!请等待管理员处理!详情可前往用户中心查看"),p.commit("setHasNewOrder",!0),Object.keys(s).forEach(e=>{typeof s[e]=="boolean"?s[e]=!1:s[e]=""}),S.push("/")}).catch(()=>{u.error("表单提交失败")}).finally(()=>{a.value=!1})};return(n,e)=>(N(),q(U,null,[x(j),t("div",_,[t("div",c,[e[18]||(e[18]=t("p",{class:"info-text"}," 表格所填写的信息只用于公司了解业务详情，遵守隐私法律绝不出售，谢谢配合！ ",-1)),e[19]||(e[19]=t("p",{class:"info-text"}," 请准确填写您的信息方便与您联系，如有任何疑惑可直接拨打电话咨询，公司营业时间为早上9点到下午4点：10086 ",-1)),t("form",{onSubmit:w(m,["prevent"])},[t("div",k,[e[9]||(e[9]=t("label",{for:"gender"},[r("敬称 "),t("span",{class:"required"},"*")],-1)),l(t("select",{id:"gender","onUpdate:modelValue":e[0]||(e[0]=o=>s.gender=o),required:""},e[8]||(e[8]=[t("option",{value:""},"选择",-1),t("option",{value:"M"},"先生",-1),t("option",{value:"F"},"女士",-1)]),512),[[d,s.gender]])]),t("div",E,[e[10]||(e[10]=t("label",{for:"fullName"},[r("姓名/姓氏"),t("span",{class:"required"},"*")],-1)),l(t("input",{type:"text",id:"fullName","onUpdate:modelValue":e[1]||(e[1]=o=>s.fullName=o),required:""},null,512),[[i,s.fullName]])]),t("div",R,[e[11]||(e[11]=t("label",{for:"email"},"邮箱",-1)),l(t("input",{type:"email",id:"email","onUpdate:modelValue":e[2]||(e[2]=o=>s.email=o)},null,512),[[i,s.email]])]),t("div",B,[e[12]||(e[12]=t("label",{for:"projectName"},[r("项目名称"),t("span",{class:"required"},"*")],-1)),l(t("input",{type:"text",id:"projectName","onUpdate:modelValue":e[3]||(e[3]=o=>s.projectName=o),required:""},null,512),[[i,s.projectName]])]),t("div",D,[e[13]||(e[13]=t("label",{for:"site"},[r("施工地址"),t("span",{class:"required"},"*")],-1)),l(t("input",{type:"text",id:"site","onUpdate:modelValue":e[4]||(e[4]=o=>s.site=o),required:""},null,512),[[i,s.site]])]),t("div",T,[e[15]||(e[15]=t("label",{for:"product"},[r("服务类型选择"),t("span",{class:"required"},"*")],-1)),l(t("select",{id:"product","onUpdate:modelValue":e[5]||(e[5]=o=>s.product=o),required:""},e[14]||(e[14]=[t("option",{value:""},"选择服务类型",-1),t("option",{value:1},"工程测绘",-1),t("option",{value:2},"线与不动产测绘",-1),t("option",{value:3},"地理信息系统工程",-1),t("option",{value:4},"两项或者以上",-1),t("option",{value:5},"其他",-1)]),512),[[d,s.product]])]),t("div",C,[e[16]||(e[16]=t("label",{for:"issue"},"施工大致描述",-1)),l(t("textarea",{id:"issue","onUpdate:modelValue":e[6]||(e[6]=o=>s.issue=o),rows:"5"},null,512),[[i,s.issue]])]),t("div",I,[l(t("input",{class:"newsletter_style",type:"checkbox",id:"newsletter","onUpdate:modelValue":e[7]||(e[7]=o=>s.newsletter=o)},null,512),[[y,s.newsletter]]),e[17]||(e[17]=t("label",{for:"newsletter"},"订阅我们的消息",-1))]),t("button",{type:"submit",class:"submit-button",disabled:a.value},V(a.value?"提交中...":"提交"),9,O)],32)])])],64))}},Y=f(H,[["__scopeId","data-v-b44fd715"]]);export{Y as default};
