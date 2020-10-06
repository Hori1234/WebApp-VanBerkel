"""Added trucks and orders tables

Revision ID: b9d32756fc56
Revises: b6954ffedcc5
Create Date: 2020-10-06 11:45:14.331222

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '71a29236c06a'
down_revision = 'b6954ffedcc5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order_sheet',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('upload_date', sa.DateTime(),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'),
                              nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('truck_sheet',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('upload_date', sa.DateTime(),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'),
                              nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('order',
                    sa.Column('order_number', sa.Integer(), nullable=False),
                    sa.Column('sheet_id', sa.Integer(), nullable=True),
                    sa.Column('inl_terminal', sa.String(), nullable=False),
                    sa.Column('truck_type', sa.String(), nullable=False),
                    sa.Column('hierarchy', sa.Float(), nullable=False),
                    sa.Column('delivery_deadline', sa.Integer(),
                              nullable=False),
                    sa.Column('driving_time', sa.Integer(), nullable=False),
                    sa.Column('process_time', sa.Integer(), nullable=False),
                    sa.Column('others', sa.JSON(), nullable=True),
                    sa.ForeignKeyConstraint(['sheet_id'],
                                            ['order_sheet.id'],
                                            ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('order_number')
                    )
    op.create_table('truck',
                    sa.Column('s_number', sa.Integer(), nullable=False),
                    sa.Column('sheet_id', sa.Integer(), nullable=True),
                    sa.Column('truck_id', sa.String(), nullable=False),
                    sa.Column('availability', sa.Boolean(), nullable=False),
                    sa.Column('truck_type', sa.String(), nullable=False),
                    sa.Column('business_type', sa.String(), nullable=False),
                    sa.Column('terminal', sa.String(), nullable=False),
                    sa.Column('hierarchy', sa.Float(), nullable=False),
                    sa.Column('use_cost', sa.Float(), nullable=False),
                    sa.Column('date', sa.Date(), nullable=False),
                    sa.Column('starting_time', sa.Time(), nullable=False),
                    sa.Column('others', sa.JSON(), nullable=True),
                    sa.ForeignKeyConstraint(['sheet_id'],
                                            ['truck_sheet.id'],
                                            ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('s_number')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('truck')
    op.drop_table('order')
    op.drop_table('truck_sheet')
    op.drop_table('order_sheet')
    # ### end Alembic commands ###
