import common from './common.json';

const Footer = () => {
  return (
    <footer className={`footer`}>
      <div>
        <div className="footer-attribution text-sm md:text-base">
          <span>© SEACF {new Date().getFullYear()}</span>
          <span>Created by Matthew Christopher Albert</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
