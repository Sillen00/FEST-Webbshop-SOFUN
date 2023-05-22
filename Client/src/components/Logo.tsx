interface LogoProps {
  height: number;
  width: number;
}

const styledLogo = {
  color: '#2b2929',
  letterSpacing: '0.25em',
  fontSize: '3rem',
};

export default function Logo(props: LogoProps) {
  return <h1 style={styledLogo}>SO-FUN</h1>;
}
