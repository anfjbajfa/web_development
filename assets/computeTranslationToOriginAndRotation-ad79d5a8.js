import{ft as i,fu as R,fv as P,fw as S,fx as s,G as N,fy as O,fz as c,fA as M,d6 as T,d4 as u}from"./index-c6cfe049.js";function e(f,o,t){const a=Math.sin(f),r=Math.cos(f),E=Math.sin(o),C=Math.cos(o),n=t;return n[0]=-a,n[4]=-E*r,n[8]=C*r,n[12]=0,n[1]=r,n[5]=-E*a,n[9]=C*a,n[13]=0,n[2]=0,n[6]=C,n[10]=E,n[14]=0,n[3]=0,n[7]=0,n[11]=0,n[15]=1,n}function F(f,o,t){return e(f,o,t),i(t,t),t}function G(f,o,t,a){if(f==null||a==null)return!1;const r=R(f,P),E=R(a,S);if(r===E&&!_(E)&&(r!==s.UNKNOWN||N(f,a)))return O(t,o),!0;if(_(E)){const C=c[r][s.LON_LAT],n=c[s.LON_LAT][E];return C!=null&&n!=null&&(C(o,0,A,0),n(A,0,L,0),e(l*A[0],l*A[1],t),t[12]=L[0],t[13]=L[1],t[14]=L[2],!0)}if(!(E!==s.WEB_MERCATOR&&E!==s.PLATE_CARREE&&E!==s.WGS84&&E!==s.CGCS2000||r!==s.WGS84&&r!==s.SPHERICAL_ECEF&&r!==s.WEB_MERCATOR&&r!==s.CGCS2000)){const C=c[r][s.LON_LAT],n=c[s.LON_LAT][E];return C!=null&&n!=null&&(C(o,0,A,0),n(A,0,L,0),r===s.SPHERICAL_ECEF?F(l*A[0],l*A[1],t):M(t),t[12]=L[0],t[13]=L[1],t[14]=L[2],!0)}return!1}function _(f){return f===s.SPHERICAL_ECEF||f===s.SPHERICAL_MARS_PCPF||f===s.SPHERICAL_MOON_PCPF}const l=T(1),A=u(),L=u();export{G as u};
