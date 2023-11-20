import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export var HStack = function(props: HStackProps) {
    return <Flex direction="row" {...props} />;
};
