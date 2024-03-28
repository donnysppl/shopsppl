export const RightArrowCircleIcon = ({color,width,height} : {
    color:string,
    width?:string,
    height?:string,

}) => (

    <svg width={width ? width : "24px"} height={height ? height : "24px"} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 16L22 16M22 16L16.75 10.75M22 16L16.75 21.25" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 0.999999C7.7158 0.999998 1 7.7158 1 16C1 24.2843 7.7158 31 16 31C24.2843 31 31 24.2843 31 16C31 7.7158 24.2843 0.999999 16 0.999999Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
</svg>

)
