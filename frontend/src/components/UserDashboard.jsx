import {useEffect,useState} from "react"
import axios from "axios"
import {
pageBackground,
pageWrapper,
cardClass,
headingClass,
bodyText,
articleTitle,
articleExcerpt,
articleMeta,
articleGrid,
emptyStateClass,
loadingClass,
tagClass,
} from "../styles/common"

function UserDashboard(){

const [articles,setArticles]=useState([])

const getArticles=async()=>{

const res = await axios.get(
"http://localhost:4000/user-api/articles",
{withCredentials:true}
)

setArticles(res.data.payload)

}

useEffect(()=>{

getArticles()

},[])

return(

<div className={pageBackground}>
<div className={pageWrapper}>
<div className={`${cardClass} mb-8`}>
<p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Reader view</p>
<h2 className={headingClass}>User Dashboard</h2>
<p className={`${bodyText} mt-3`}>Browse recently published articles in a simplified reading layout.</p>
</div>

{articles.length === 0 ? (
<div className={`${cardClass} ${emptyStateClass}`}>
<p>No articles loaded yet.</p>
</div>
) : (
<div className={articleGrid}>
{articles.map((a)=>(
<article key={a._id} className={cardClass}>
<span className={tagClass}>{a.category}</span>
<h3 className={articleTitle}>{a.title}</h3>
<p className={articleExcerpt}>{a.content.substring(0, 160)}...</p>
<p className={articleMeta}>{new Date(a.createdAt || Date.now()).toLocaleDateString()}</p>
</article>
))}
</div>
)}

</div>
</div>

)

}

export default UserDashboard