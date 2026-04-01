import React, { useMemo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Empty, Rate, Row, Select, Slider, Tag } from 'antd';
import { mockDestinations } from '@/services/mockData';
import { Destination, DestinationType } from '@/types/travel';
import './style.less';

const TYPE_LABEL: Record<DestinationType, string> = {
	beach: 'Bien',
	mountain: 'Nui',
	city: 'Thanh pho',
};

const LOCATION_MAP: Record<string, string> = {
	'1': 'Da Nang',
	'2': 'Lao Cai',
	'3': 'Ha Noi',
};

const SORT_OPTIONS = [
	{ label: 'Danh gia cao nhat', value: 'rating-desc' },
	{ label: 'Gia thap den cao', value: 'price-asc' },
	{ label: 'Gia cao den thap', value: 'price-desc' },
	{ label: 'Ten A-Z', value: 'name-asc' },
];

const DEFAULT_FILTERS = {
	type: 'all' as DestinationType | 'all',
	maxPrice: 2000000,
	minRating: 0,
	sortBy: 'rating-desc',
};

const formatCurrency = (amount: number) =>
	amount.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
		maximumFractionDigits: 0,
	});

const Explore: React.FC = () => {
	const [type, setType] = useState<DestinationType | 'all'>(DEFAULT_FILTERS.type);
	const [maxPrice, setMaxPrice] = useState<number>(DEFAULT_FILTERS.maxPrice);
	const [minRating, setMinRating] = useState<number>(DEFAULT_FILTERS.minRating);
	const [sortBy, setSortBy] = useState<string>(DEFAULT_FILTERS.sortBy);

	const filteredDestinations = useMemo(() => {
		const result = mockDestinations.filter((item) => {
			const matchesType = type === 'all' || item.type === type;
			const matchesPrice = item.price <= maxPrice;
			const matchesRating = item.rating >= minRating;

			return matchesType && matchesPrice && matchesRating;
		});

		return result.sort((a, b) => {
			switch (sortBy) {
				case 'price-asc':
					return a.price - b.price;
				case 'price-desc':
					return b.price - a.price;
				case 'name-asc':
					return a.name.localeCompare(b.name, 'vi');
				default:
					return b.rating - a.rating;
			}
		});
	}, [type, maxPrice, minRating, sortBy]);

	const resetFilters = () => {
		setType(DEFAULT_FILTERS.type);
		setMaxPrice(DEFAULT_FILTERS.maxPrice);
		setMinRating(DEFAULT_FILTERS.minRating);
		setSortBy(DEFAULT_FILTERS.sortBy);
	};

	return (
		<PageContainer title='Kham pha diem den'>
			<div className='explore-page'>
				<Card className='filter-card'>
					<div className='filter-top'>
						<p>
							<b>{filteredDestinations.length}</b> diem den phu hop
						</p>
						<Button onClick={resetFilters}>Dat lai bo loc</Button>
					</div>

					<div className='filter-grid'>
						<div className='filter-item'>
							<p className='filter-label'>Loai hinh</p>
							<Select
								value={type}
								onChange={(value) => setType(value)}
								options={[
									{ label: 'Tat ca', value: 'all' },
									{ label: 'Bien', value: 'beach' },
									{ label: 'Nui', value: 'mountain' },
									{ label: 'Thanh pho', value: 'city' },
								]}
							/>
						</div>

						<div className='filter-item'>
							<p className='filter-label'>Muc gia toi da</p>
							<Slider
								min={0}
								max={2000000}
								step={100000}
								value={maxPrice}
								onChange={(value) => {
									if (typeof value === 'number') {
										setMaxPrice(value);
									}
								}}
								tipFormatter={(value) => formatCurrency(value || 0)}
							/>
							<p className='filter-value'>{formatCurrency(maxPrice)}</p>
						</div>

						<div className='filter-item'>
							<p className='filter-label'>Danh gia toi thieu</p>
							<Slider
								min={0}
								max={5}
								step={0.5}
								value={minRating}
								onChange={(value) => {
									if (typeof value === 'number') {
										setMinRating(value);
									}
								}}
							/>
							<p className='filter-value'>{minRating.toFixed(1)} / 5</p>
						</div>

						<div className='filter-item'>
							<p className='filter-label'>Sap xep</p>
							<Select value={sortBy} onChange={(value) => setSortBy(value)} options={SORT_OPTIONS} />
						</div>
					</div>
				</Card>

				<Row gutter={[16, 16]}>
					{filteredDestinations.length === 0 && (
						<Col span={24}>
							<Card>
								<Empty description='Khong co diem den phu hop bo loc hien tai' />
							</Card>
						</Col>
					)}

					{filteredDestinations.map((destination: Destination) => (
						<Col key={destination.id} xs={24} sm={12} lg={8}>
							<Card
								hoverable
								cover={<img src={destination.image} alt={destination.name} className='destination-image' />}
								className='destination-card'
							>
								<div className='destination-header'>
									<h3>{destination.name}</h3>
									<Tag color='blue'>{TYPE_LABEL[destination.type]}</Tag>
								</div>
								<p className='destination-location'>{LOCATION_MAP[destination.id] || 'Viet Nam'}</p>
								<div className='destination-rating'>
									<Rate allowHalf disabled value={destination.rating} />
									<span>{destination.rating.toFixed(1)} / 5</span>
								</div>
								<p className='destination-price'>{formatCurrency(destination.price)} / nguoi</p>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</PageContainer>
	);
};

export default Explore;
