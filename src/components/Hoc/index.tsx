import React from 'react'

interface IProps {
    isUsingHOC: boolean
}

export function WithHOC<P>(
    WrappedComponent: React.FunctionComponent<P & IProps>
): (props: P) => JSX.Element {
    const ComponentWithHOC = (props: P): JSX.Element => {
        return <WrappedComponent {...props} isUsingHOC={true} />
    }

    return ComponentWithHOC
}
