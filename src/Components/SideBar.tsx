type SortType = "recent" | "oldest" | "done" | "undone"| "allTasks";

interface Class {
  classes: string;
  AnimateSidebar?: (config: boolean) => void;
  setNav?: (config: string) => void;
  clearAllTasks: () => void
  setSortType: (sortType: SortType) => void
}

function SideBar(props: Class) {

  const handleBtnClick = () => {
    if (props.AnimateSidebar && props.setNav) {
      props.AnimateSidebar(false)
      props.setNav('visible')
    }
  }

  const handleSortClick = (sortType : SortType) => {
    props.setSortType(sortType)
  }

  return (
    <aside className={props.classes}>
      <div className="asideContent">
        <h3>Opções</h3>
        <ul>
          <li><p onClick={() => handleSortClick("recent")}>organizar pela mais recente</p></li>
          <li><p onClick={() => handleSortClick("oldest")}>organizar pela mais antiga</p></li>
          <li><p onClick={() => handleSortClick("done")}>Tarefas feitas</p></li>
          <li><p onClick={() => handleSortClick("undone")}>Tarefas não feitas</p></li>
          <li><p onClick={() => handleSortClick("allTasks")}>Todas as terefas</p></li>
          <li><p className="deleteAllBtn" onClick={props.clearAllTasks}>Apagar tudo</p></li>
        </ul>
      </div>
      <div className="close">
        <button className="navBtn" onClick={handleBtnClick}>
          <span className="navToggle"></span>
          <span className="navToggle"></span>
          <span className="navToggle"></span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;