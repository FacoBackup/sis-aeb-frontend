import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'

export default function TabContent(props){
    return(
        props.tabs.map(tab => {
            if (tab !== null && tab.buttonKey === props.openTab)
                return (
                    <div className={mainStyles.displayInlineCenter} style={{
                        position: "relative",
                        zIndex: 0,
                        width: '100%',
                        marginTop: '25px'
                    }}
                         key={tab.buttonKey + '-content'}>
                        {tab.value}
                    </div>
                )
            else
                return null
        })
    )
}

TabContent.propTypes={
    tabs: PropTypes.array,
    openTab: PropTypes.any,

}