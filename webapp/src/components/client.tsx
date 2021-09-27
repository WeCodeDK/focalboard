// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react'

import {BoardView} from '../blocks/boardView'
import IconButton from '../widgets/buttons/iconButton'
import DisclosureTriangle from '../widgets/icons/disclosureTriangle'

import {Board} from '../blocks/board'

import SidebarBoardItem from './sidebar/sidebarBoardItem'

type Props = {
    name: string,
    boards: Board[],
    views: BoardView[],
    activeViewId?: string,
    activeBoardId?: string
}

class Client extends React.Component<Props> {
    shouldComponentUpdate(): boolean {
        return true
    }
    constructor(props:Props) {
        super(props)
        this.state = {
            name: props.name,
            boards: props.boards,
            views: props.views,
            activeView: props.activeViewId,
            activeBoard: props.activeBoardId,
            collapsed: false,
        }
    }
    setCollapsed() {
        this.setState({
            collapsed: true,
        })
    }
    render() : JSX.Element {
        return (
            <div className='SidebarBoardItem'>
                <IconButton
                    icon={<DisclosureTriangle/>}
                    onClick={() => this.setCollapsed()}
                />
                <div
                    className='octo-sidebar-title'
                    title={this.props.name}
                >
                    {this.props.name}
                    <div className='octo-sidebar-list'>
                        {
                            this.props.boards.map((board) => {
                                const nextBoardId = this.props.boards.length > 1 ? this.props.boards.find((o) => o.id !== board.id)?.id : undefined
                                return (
                                    <SidebarBoardItem
                                        key={board.id}
                                        views={this.props.views}
                                        board={board}
                                        activeBoardId={this.props.activeBoardId}
                                        activeViewId={this.props.activeViewId}
                                        nextBoardId={board.id === this.props.activeBoardId ? nextBoardId : undefined}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Client

