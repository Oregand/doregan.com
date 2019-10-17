import styled from 'styled-components'

export const Wrapper = styled.div`
	background-size: contain;
	background-position: left top;
	background-repeat: no-repeat;
`

export const PricesWrapper = styled.div`
	padding: 4rem 0;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 960px) {
		flex-direction: column;
	}
`

export const Card = styled.div`
	background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,0);
    flex: 1;
    margin: 8px;
    padding: 30px;
    position: relative;
    text-align: center;
    transition: all 0.5s ease-in-out;
    
    &:hover {
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
`

export const CardPopular = styled(Card)`
	   margin-top: -10px;
        margin-bottom: -10px; 
        .card-title {
            h3 {
                color: #3498db;
                font-size: 22px;
            }
        }
        .card-price {
            margin: 50px;
            h1 {
                color: #3498db;
                font-size: 60px;
            }
        }
        .card-action {
            button {
                background-color: #3498db;
                border-radius: 80px;
                color: #fff;
                font-size: 17px;
                margin-top: -15px;
                padding: 15px;
                height: 80px;
                &:hover {
                    background-color: darken(#3498db,7);
                    font-size: 23px;
                }
            }
        }
`

export const CardRibbon = styled.div`
    position: absolute;
    overflow: hidden;
    top: -10px;
    left: -10px;
    width: 114px;
    height: 112px;
    span {
        position: absolute;
        display: block;
        width: 160px;
        padding: 10px 0;
        background-color: #3498db;
        box-shadow: 0 5px 5px rgba(0,0,0,0.2);
        color: #fff;
        font-size: 13px;
        text-transform: uppercase;
        text-align: center;
        left: -35px;
        top: 25px;
        transform: rotate(-45deg);
    }
    &::before,
    &::after {
        position: absolute;
        z-index: -1;
        content: '';
        display: block;
        border: 5px solid #2980b9;
        border-top-color: transparent;
        border-left-color: transparent;
    }
    &::before {
        top: 0;
        right: 0; 
    }
    &::after {
        bottom: 0;
        left: 0;
    }
`

export const CardTitle = styled.div`
    h3 {
        color: rgba(0,0,0,0.3);
        font-size: 15px;
        text-transform: uppercase;
    }
    h4 {
        color: rgba(0,0,0,0.6);
    }
`
export const CardPrice = styled.div`
    margin: 60px 0;
    h1 {
        font-size: 46px;
        sup{
            font-size: 15px;
            display: inline-block;
            margin-left: -20px;
            width: 10px;
        }
        small {
            color: rgba(0,0,0,0.3);
            display: block;
            font-size: 11px;
            text-transform: uppercase;
        }
    }
`

export const CardDescription = styled.div`
    ul {
        display: block;
        list-style: none;
        margin: 60px 0;
        padding: 0;
    }
    li {
        color: rgba(0,0,0,0.6);
        font-size: 15px;
        margin: 0 0 15px;
        &::before {
            font-family: FontAwesome;
            content: "\f00c";
            padding: 0 5px 0 0;
            color: rgba(0,0,0,0.15);
        }
    }
`

export const CardAction = styled.div`
    button {
        background: transparent;
        border: 2px solid #3498db;
        border-radius: 30px;
        color: #3498db;
        cursor: pointer;
        display: block;
        font-size: 15px;
        font-weight: bold;
        padding: 20px;
        width: 100%;
        height: 60px;
        text-transform: uppercase;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: #3498db;
            box-shadow: 0 2px 4px darken(#3498db,20);
            color: #fff;
            font-size: 17px;
        }
    }
`