
export const DateBox=({change})=>{
    return(
       <div class="DateBox">
        <label>from</label>
        <input onInput={(e)=>change(e.target.value)} type="date"></input>
       </div>
    );
}