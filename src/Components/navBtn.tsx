interface Prop {
  nav: string;
  setNav?: (config: string) => void;
  setConfig: string;
  AnimateSidebar?: (use: boolean) => void;
}

const NavBtn: React.FC<Prop> = (props) => {
  const handleClick = () => {
    if (props.setNav && props.AnimateSidebar) {
      props.setNav(props.setConfig);
      props.AnimateSidebar(true)
    }
  };


  return (
    <button onClick={handleClick} className={props.nav + " navBtn"}>
        <span className="navToggle"></span>
        <span className="navToggle"></span>
        <span className="navToggle"></span>
    </button>
  );
}

export default NavBtn;